const fs = require("fs");
const path = require("path");

const ROOT_DIR = process.cwd();

const SITE_URL = "https://eplus.dev";

const DATA_DIR = path.join(ROOT_DIR, "data");
const POSTS_OUTPUT_FILE = path.join(DATA_DIR, "posts.json");
const RSS_OUTPUT_FILE = path.join(ROOT_DIR, "feed.rss");

const FEED_TITLE = "ePlus DEV";
const FEED_DESCRIPTION = "Latest posts from ePlus DEV";

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

function extractValue(content, key) {
  return extractFromFrontmatter(content, key) || extractFromMarkdownTable(content, key);
}

function cleanValue(value) {
  if (!value) return null;

  return String(value)
    .replace(/^["']|["']$/g, "")
    .replace(/<br\s*\/?>/gi, "")
    .trim();
}

function buildPostUrl(slug) {
  if (!slug) return SITE_URL;

  if (slug.startsWith("http://") || slug.startsWith("https://")) {
    return slug;
  }

  return `${SITE_URL}/${slug.replace(/^\/+/, "")}`;
}

function extractPostData(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  const title = cleanValue(extractValue(content, "title"));
  const rawSlug = cleanValue(extractValue(content, "slug"));

  const postId = cleanValue(
    extractValue(content, "_id") ||
      extractValue(content, "postId") ||
      extractValue(content, "id") ||
      extractValue(content, "cuid")
  );

  const datePublished = cleanValue(
    extractValue(content, "datePublished") ||
      extractValue(content, "publishedAt") ||
      extractValue(content, "date")
  );

  if (!title || !rawSlug) {
    return null;
  }

  return {
    _id: postId || path.basename(filePath, ".md"),
    title,
    slug: buildPostUrl(rawSlug),
    datePublished,
  };
}

function escapeXml(value) {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRssDate(dateValue) {
  if (!dateValue) return new Date().toUTCString();

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return new Date().toUTCString();
  }

  return date.toUTCString();
}

function generateRss(posts) {
  const items = posts
    .map((post) => {
      const url = post.slug;

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${escapeXml(toRssDate(post.datePublished))}</pubDate>
    </item>`;
    })
    .join("");

  const latestPubDate = posts.length
    ? toRssDate(posts[0].datePublished)
    : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${escapeXml(new Date().toUTCString())}</lastBuildDate>
    <pubDate>${escapeXml(latestPubDate)}</pubDate>
    <generator>GitHub Actions</generator>
${items}
  </channel>
</rss>
`;
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

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

fs.writeFileSync(
  POSTS_OUTPUT_FILE,
  JSON.stringify(posts, null, 2) + "\n",
  "utf8"
);

fs.writeFileSync(RSS_OUTPUT_FILE, generateRss(posts), "utf8");

console.log(`Generated ${posts.length} posts`);
console.log(`Output: ${POSTS_OUTPUT_FILE}`);
console.log(`Output: ${RSS_OUTPUT_FILE}`);