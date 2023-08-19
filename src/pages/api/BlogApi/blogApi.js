import { saveAllBlogs } from "@/services/blog";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).send();
  }
  const { title, blog } = req.body;
  saveAllBlogs(title, blog);
  res.status(201).send();
}
