const fs = require("fs");
const path = require("path");

const ROOT_DIR = process.cwd();
const OUTPUT_FILE = path.join(ROOT_DIR, "posts.json");

const IGNORE_DIRS = new Set([
  ".git",
  ".github",
  "node_modules",
  "dist",
  "build",
  ".next",
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

function extractPostData(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  const title =
    extractFromFrontmatter(content, "title") ||
    extractFromMarkdownTable(content, "title");

  const slug =
    extractFromFrontmatter(content, "slug") ||
    extractFromMarkdownTable(content, "slug");

  const postId =
    extractFromFrontmatter(content, "_id") ||
    extractFromFrontmatter(content, "postId") ||
    extractFromFrontmatter(content, "id") ||
    extractFromMarkdownTable(content, "_id") ||
    extractFromMarkdownTable(content, "postId") ||
    extractFromMarkdownTable(content, "id") ||
    extractFromFrontmatter(content, "cuid") ||
    extractFromMarkdownTable(content, "cuid");

  if (!title || !slug) {
    return null;
  }

  return {
    _id: cleanValue(postId || path.basename(filePath, ".md")),
    title: cleanValue(title),
    slug: cleanValue(slug),
  };
}

const markdownFiles = walk(ROOT_DIR);

const posts = markdownFiles
  .map(extractPostData)
  .filter(Boolean)
  .sort((a, b) => a.title.localeCompare(b.title));

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2) + "\n", "utf8");

console.log(`Generated ${posts.length} posts`);
console.log(`Output: ${OUTPUT_FILE}`);