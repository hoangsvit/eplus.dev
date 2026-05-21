const fs = require("fs");
const path = require("path");

const ROOT_DIR = process.cwd();
const OUTPUT_DIR = path.join(ROOT_DIR, "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "posts.json");

const IGNORE_DIRS = new Set([
  ".git",
  ".github",
  "node_modules",
  "dist",
  "build",
  ".next",
  "data",
]);

function walk(dir, result = []) {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.has(entry)) {
        walk(fullPath, result);
      }
      continue;
    }

    if (stat.isFile() && entry.endsWith(".md")) {
      result.push(fullPath);
    }
  }

  return result;
}

function extractFromMarkdownTable(content, key) {
  const regex = new RegExp(`\\|\\s*${key}\\s*\\|\\s*(.*?)\\s*\\|`, "i");
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

function extractFromFrontmatter(content, key) {
  const regex = new RegExp(`^${key}:\\s*["']?(.*?)["']?\\s*$`, "im");
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

function cleanValue(value) {
  if (!value) return null;

  return value
    .replace(/^["']|["']$/g, "")
    .replace(/<br\s*\/?>/gi, "")
    .trim();
}

function extractValue(content, key) {
  return extractFromFrontmatter(content, key) || extractFromMarkdownTable(content, key);
}

function extractPostData(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  const title = extractValue(content, "title");
  const slug = extractValue(content, "slug");

  const postId =
    extractValue(content, "_id") ||
    extractValue(content, "postId") ||
    extractValue(content, "id") ||
    extractValue(content, "cuid");

  const datePublished =
    extractValue(content, "datePublished") ||
    extractValue(content, "publishedAt") ||
    extractValue(content, "date");

  if (!title || !slug) {
    return null;
  }

  return {
    _id: cleanValue(postId || path.basename(filePath, ".md")),
    title: cleanValue(title),
    slug: cleanValue(slug),
    datePublished: cleanValue(datePublished),
  };
}

const markdownFiles = walk(ROOT_DIR);

const posts = markdownFiles
  .map(extractPostData)
  .filter(Boolean)
  .sort((a, b) => {
    const dateA = new Date(a.datePublished || 0).getTime();
    const dateB = new Date(b.datePublished || 0).getTime();

    return dateB - dateA;
  });

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2) + "\n", "utf8");

console.log(`Generated ${posts.length} posts`);
console.log(`Output: ${OUTPUT_FILE}`);