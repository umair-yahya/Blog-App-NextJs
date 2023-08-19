import { getById } from "@/services/blog";

export default function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    console.log(getId);
    const getId = getById(id);
    return res.status(200).json(getId);
  }
  return res.status(404).send();
}
