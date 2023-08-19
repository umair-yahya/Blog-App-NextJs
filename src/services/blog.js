import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "blog.json");

export function getBlogs() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

export function getById(id) {
  const data = getBlogs();
  return data.find((value) => value.id == +id);
}

export function saveAllBlogs(title, blog) {
  const blogs = getBlogs();
  blogs.push({
    id: blogs.length + 1,
    title,
    blog,
  });
  fs.writeFileSync(filePath, JSON.stringify(blogs));
}
