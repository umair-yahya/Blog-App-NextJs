import fs from "fs";
import path from "path";
import { hash, compare } from "bcryptjs";

const filePath = path.join(process.cwd(), "src", "data", "user.json");

export function getAll() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

export function getByEmail(email) {
  const data = getAll();
  return data.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function verifyPass(hashPass, password) {
  const valid = await compare(password, hashPass);
  return valid;
}

export async function saveUser(email, firstName, lastName, password) {
  const found = getByEmail(email);
  if (found) {
    throw new Error("User already exists");
  }
  const hashPass = await hash(password, 12);

  const data = getAll();
  data.push({
    id: data.length + 1,
    email,
    firstName,
    lastName,
    password: hashPass,
  });
  fs.writeFileSync(filePath, JSON.stringify(data));
}
