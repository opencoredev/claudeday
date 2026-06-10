import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import handler from "./dist/server/server.js";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const clientDir = resolve(rootDir, "dist/client");
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "0.0.0.0";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function resolveStaticPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const normalized = decoded.replace(/^\/+/, "");
  const filePath = resolve(join(clientDir, normalized));

  if (filePath !== clientDir && !filePath.startsWith(`${clientDir}${sep}`)) {
    return null;
  }

  return filePath;
}

async function tryServeStatic(req, res, url) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return false;
  }

  const filePath = resolveStaticPath(url.pathname);
  if (!filePath) {
    res.writeHead(400);
    res.end("Bad request");
    return true;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      return false;
    }

    const contentType = mimeTypes[extname(filePath)] ?? "application/octet-stream";
    const isAsset = url.pathname.startsWith("/assets/");
    res.writeHead(200, {
      "cache-control": isAsset ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate",
      "content-length": fileStat.size,
      "content-type": contentType,
    });

    if (req.method === "HEAD") {
      res.end();
      return true;
    }

    createReadStream(filePath).pipe(res);
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

function createFetchRequest(req, url) {
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(key, item);
      }
    } else if (value !== undefined) {
      headers.set(key, value);
    }
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  return new Request(url, {
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
    headers,
    method: req.method,
  });
}

async function writeFetchResponse(res, response) {
  res.statusCode = response.status;
  res.statusMessage = response.statusText;

  for (const [key, value] of response.headers.entries()) {
    if (key !== "set-cookie") {
      res.setHeader(key, value);
    }
  }

  if (typeof response.headers.getSetCookie === "function") {
    const cookies = response.headers.getSetCookie();
    if (cookies.length > 0) {
      res.setHeader("set-cookie", cookies);
    }
  } else {
    const cookie = response.headers.get("set-cookie");
    if (cookie) {
      res.setHeader("set-cookie", cookie);
    }
  }

  if (!response.body) {
    res.end();
    return;
  }

  Readable.fromWeb(response.body).pipe(res);
}

const server = createServer(async (req, res) => {
  try {
    const origin = `http://${req.headers.host ?? `localhost:${port}`}`;
    const url = new URL(req.url ?? "/", origin);

    if (await tryServeStatic(req, res, url)) {
      return;
    }

    const request = createFetchRequest(req, url);
    const response = await handler.fetch(request);
    await writeFetchResponse(res, response);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    }
    res.end("Internal server error");
  }
});

server.listen(port, host, () => {
  console.log(`claudeday web listening on ${host}:${port}`);
});

function shutdown() {
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }

    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
