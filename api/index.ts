import { BrowserAgent } from "./agent";
import { normUrl } from "./utils";

const agent = new BrowserAgent();

export default function handler(req: any, res: any) {
  const origin = req.headers.origin;
  if (origin) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const path = req.url?.split("?")[0];

    if (req.method === "POST" && path === "/api/visit") {
      const { url } = req.body;
      if (!url) return res.status(400).json({ error: "URL required" });
      agent.visit(normUrl(url));
      return res.json({ ...agent.getState(), error: null });
    }

    if (req.method === "POST" && path === "/api/back") {
      const result = agent.goBack();
      return res.json({ ...agent.getState(), error: result.success ? null : result.error });
    }

    if (req.method === "POST" && path === "/api/forward") {
      const result = agent.goForward();
      return res.json({ ...agent.getState(), error: result.success ? null : result.error });
    }

    if (req.method === "POST" && path === "/api/reset") {
      agent.reset();
      return res.json({ ...agent.getState(), error: null });
    }

    if (req.method === "GET" && path === "/api/state") {
      return res.json({ ...agent.getState(), error: null });
    }

    res.status(404).json({ error: "Not found" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
