export function normUrl(url: string): string {
  let normalized = url.trim();
  if (!normalized.includes("://")) normalized = "https://" + normalized;
  try {
    const parsed = new (globalThis as any).URL(normalized);
    return (parsed.protocol + "//" + parsed.hostname.toLowerCase() + parsed.pathname + parsed.search + parsed.hash).replace(/\/+$/, "");
  } catch {
    return normalized;
  }
}
