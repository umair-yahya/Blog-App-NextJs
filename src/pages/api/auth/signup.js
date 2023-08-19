import { saveUser } from "@/services/user";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).send();
  }
  const { email, firstName, lastName, password } = req.body;
  try {
    saveUser(email, firstName, lastName, password);
    res.status(201).send();
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
