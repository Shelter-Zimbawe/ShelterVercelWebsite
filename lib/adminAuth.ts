import { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "admin_session";

function getAdminSecret() {
  return process.env.ADMIN_SECRET || "";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

// SHA-256 using Web Crypto API — works in both Edge and Node.js runtimes
async function sha256Hex(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Constant-time string comparison (same-length hex strings)
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function isAdminConfigured() {
  return Boolean(getAdminSecret() && getAdminPassword());
}

export async function createAdminSessionValue(): Promise<string> {
  const token = crypto.randomUUID();
  const sig = await sha256Hex(token + getAdminSecret());
  return `${token}.${sig}`;
}

export async function isValidAdminSession(sessionValue?: string | null): Promise<boolean> {
  if (!sessionValue || !isAdminConfigured()) return false;
  const dot = sessionValue.lastIndexOf(".");
  if (dot === -1) return false;
  const token = sessionValue.slice(0, dot);
  const sig = sessionValue.slice(dot + 1);
  if (!token || !sig) return false;
  const expected = await sha256Hex(token + getAdminSecret());
  return safeEqual(sig, expected);
}

export async function isValidAdminPassword(password: string): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  const ha = await sha256Hex(password);
  const hb = await sha256Hex(getAdminPassword());
  return safeEqual(ha, hb);
}

export async function hasAdminSession(request: NextRequest): Promise<boolean> {
  return isValidAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}
