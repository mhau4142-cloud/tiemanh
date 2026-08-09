// Dashboard quản trị Tiệm Ảnh — chạy: npm run admin → http://localhost:4322
// Node thuần, không dependency. Chỉ lắng nghe 127.0.0.1 (máy của bạn).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIRS = {
  galleryContent: path.join(ROOT, "src/content/gallery"),
  postsContent: path.join(ROOT, "src/content/posts"),
  galleryImages: path.join(ROOT, "src/images/gallery"),
  blogImages: path.join(ROOT, "src/images/blog"),
};

const CATEGORIES = [
  "Kỷ yếu & sự kiện",
  "Chân dung & profile",
  "Chụp tự do & dã ngoại",
];
const TAGS = {
  "ky-yeu": "Kỷ yếu",
  "chan-dung": "Chân dung",
  "da-ngoai": "Dã ngoại",
  "kinh-nghiem": "Kinh nghiệm",
  "dia-diem": "Địa điểm",
};
const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp"]);
const MAX_BODY = 300 * 1024 * 1024; // 300MB — đủ cho bộ ảnh lớn

// ---------- helpers ----------
const yamlStr = (s) => JSON.stringify(String(s ?? ""));

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error("Dung lượng vượt giới hạn 300MB"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function json(res, code, data) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function extOf(name) {
  const ext = String(name ?? "").split(".").pop().toLowerCase();
  return IMAGE_EXTS.has(ext) ? (ext === "jpg" ? "jpeg" : ext) : null;
}

function saveImage(filePath, base64) {
  const data = String(base64).replace(/^data:[^;]+;base64,/, "");
  fs.writeFileSync(filePath, Buffer.from(data, "base64"));
}

const safeId = (id) => /^[a-z0-9-]+$/.test(String(id));

function frontmatterField(content, field) {
  const match = content.match(new RegExp(`^${field}:\\s*"?([^"\\n]*)"?`, "m"));
  return match ? match[1].trim() : "";
}

// ---------- state ----------
function listGallery() {
  return fs
    .readdirSync(DIRS.galleryContent)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const content = fs.readFileSync(path.join(DIRS.galleryContent, f), "utf8");
      return {
        id: f.replace(/\.md$/, ""),
        title: frontmatterField(content, "title"),
        category: frontmatterField(content, "category"),
      };
    })
    .sort((a, b) => Number(b.id) - Number(a.id) || a.id.localeCompare(b.id));
}

function listPosts() {
  return fs
    .readdirSync(DIRS.postsContent)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const content = fs.readFileSync(path.join(DIRS.postsContent, f), "utf8");
      return {
        id: f.replace(/\.md$/, ""),
        title: frontmatterField(content, "title"),
        pubDate: frontmatterField(content, "pubDate"),
      };
    })
    .sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1));
}

function nextGalleryId() {
  const ids = fs
    .readdirSync(DIRS.galleryContent)
    .filter((f) => f.endsWith(".md"))
    .map((f) => Number(f.replace(/\.md$/, "")))
    .filter((n) => !Number.isNaN(n));
  return String(ids.length ? Math.max(...ids) + 1 : 1);
}

// ---------- create ----------
function createGallery(body) {
  const { title, category, description, thumbnail, images } = body;
  if (!title || !CATEGORIES.includes(category) || !description)
    throw new Error("Thiếu tiêu đề, dịch vụ hoặc mô tả");
  const thumbExt = extOf(thumbnail?.name);
  if (!thumbExt) throw new Error("Ảnh đại diện phải là jpg/png/webp");
  if (!Array.isArray(images) || images.length === 0)
    throw new Error("Cần ít nhất 1 ảnh trong bộ");

  const id = nextGalleryId();
  const imgDir = path.join(DIRS.galleryImages, `p${id}`);
  fs.mkdirSync(imgDir, { recursive: true });
  saveImage(path.join(imgDir, `thumbnail.${thumbExt}`), thumbnail.data);

  const imageLines = images.map((img, i) => {
    const ext = extOf(img.name);
    if (!ext) throw new Error(`Ảnh thứ ${i + 1} phải là jpg/png/webp`);
    saveImage(path.join(imgDir, `${i + 1}.${ext}`), img.data);
    const alt = img.alt?.trim() || `${title} — ảnh ${i + 1}`;
    return `  - url: "/src/images/gallery/p${id}/${i + 1}.${ext}"\n    alt: ${yamlStr(alt)}`;
  });

  const md = `---
category: ${yamlStr(category)}
title: ${yamlStr(title)}
description: ${yamlStr(description)}
thumbnail:
  url: "/src/images/gallery/p${id}/thumbnail.${thumbExt}"
  alt: ${yamlStr(thumbnail.alt?.trim() || title)}
images:
${imageLines.join("\n")}
---
`;
  fs.writeFileSync(path.join(DIRS.galleryContent, `${id}.md`), md);
  return { id, url: `/gallery/posts/${id}` };
}

function createPost(body) {
  const { title, slug, description, tags, cover, content } = body;
  if (!title || !slug || !description || !content)
    throw new Error("Thiếu tiêu đề, slug, mô tả hoặc nội dung");
  if (!safeId(slug)) throw new Error("Slug chỉ gồm chữ thường không dấu, số và dấu gạch");
  if (fs.existsSync(path.join(DIRS.postsContent, `${slug}.md`)))
    throw new Error("Slug đã tồn tại — đổi slug khác");
  const validTags = (Array.isArray(tags) ? tags : []).filter((t) => TAGS[t]);
  if (validTags.length === 0) throw new Error("Chọn ít nhất 1 chủ đề");
  const coverExt = extOf(cover?.name);
  if (!coverExt) throw new Error("Ảnh bìa phải là jpg/png/webp");

  saveImage(path.join(DIRS.blogImages, `${slug}.${coverExt}`), cover.data);
  const today = new Date().toISOString().slice(0, 10);
  const md = `---
title: ${yamlStr(title)}
pubDate: ${today}
description: ${yamlStr(description)}
team: "tiem-anh"
image:
  url: "/src/images/blog/${slug}.${coverExt}"
  alt: ${yamlStr(cover.alt?.trim() || title)}
tags: [${validTags.map((t) => `"${t}"`).join(", ")}]
---

${content.trim()}
`;
  fs.writeFileSync(path.join(DIRS.postsContent, `${slug}.md`), md);
  return { id: slug, url: `/blog/posts/${slug}` };
}

// ---------- delete (chỉ xóa file .md, giữ lại ảnh cho an toàn) ----------
function deleteEntry(kind, id) {
  if (!safeId(id)) throw new Error("ID không hợp lệ");
  const dir = kind === "gallery" ? DIRS.galleryContent : DIRS.postsContent;
  const file = path.join(dir, `${id}.md`);
  if (!fs.existsSync(file)) throw new Error("Không tìm thấy bài này");
  fs.unlinkSync(file);
}

// Dev server (daemon) của Astro v7 chỉ nạp content collection lúc khởi động,
// nên sau mỗi lần đăng/xóa phải khởi động lại để bài mới hiện trên web.
function restartDev() {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, 30000); // không treo quá 30s
    execFile("npx", ["astro", "dev", "stop"], { cwd: ROOT }, () => {
      execFile("npx", ["astro", "dev"], { cwd: ROOT }, () => {
        clearTimeout(timer);
        resolve();
      });
    });
  });
}

// ---------- server ----------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  try {
    if (req.method === "GET" && url.pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fs.readFileSync(path.join(__dirname, "index.html")));
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/state") {
      json(res, 200, {
        categories: CATEGORIES,
        tags: TAGS,
        gallery: listGallery(),
        posts: listPosts(),
      });
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/gallery") {
      const body = JSON.parse((await readBody(req)).toString("utf8"));
      const result = createGallery(body);
      await restartDev();
      json(res, 200, result);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/blog") {
      const body = JSON.parse((await readBody(req)).toString("utf8"));
      const result = createPost(body);
      await restartDev();
      json(res, 200, result);
      return;
    }
    const delMatch = url.pathname.match(/^\/api\/(gallery|blog)\/([a-z0-9-]+)$/);
    if (req.method === "DELETE" && delMatch) {
      deleteEntry(delMatch[1], delMatch[2]);
      await restartDev();
      json(res, 200, { ok: true });
      return;
    }
    json(res, 404, { error: "Không tìm thấy đường dẫn" });
  } catch (err) {
    json(res, 400, { error: err.message || "Có lỗi xảy ra" });
  }
});

server.listen(4322, "127.0.0.1", () => {
  console.log("✦ Dashboard Tiệm Ảnh: http://localhost:4322");
  console.log("  (giữ thêm `npm run dev` chạy song song để xem web tại :4321)");
});
