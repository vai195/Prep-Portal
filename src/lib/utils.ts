import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomString(bytes: number) {
  if (process.env.NODE_RUNTIME === "nodejs") {
    const crypto = require("crypto");
    return crypto.randomBytes(bytes).toString("hex");
  }

  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);

  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
