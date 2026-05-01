const BASE_URL = (import.meta as any).env.PROD ? '' : 'http://localhost:3000';

export interface BrowserState {
  curr: string | null;
  back: string[];
  fwd: string[];
  error: string | null;
}

export async function visitUrl(url: string): Promise<BrowserState> {
  const res = await fetch(`${BASE_URL}/api/visit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  return res.json();
}

export async function goBack(): Promise<BrowserState> {
  const res = await fetch(`${BASE_URL}/api/back`, { method: 'POST' });
  return res.json();
}

export async function goForward(): Promise<BrowserState> {
  const res = await fetch(`${BASE_URL}/api/forward`, { method: 'POST' });
  return res.json();
}

export async function resetState(): Promise<BrowserState> {
  const res = await fetch(`${BASE_URL}/api/reset`, { method: 'POST' });
  return res.json();
}

export async function getState(): Promise<BrowserState> {
  const res = await fetch(`${BASE_URL}/api/state`);
  return res.json();
}
