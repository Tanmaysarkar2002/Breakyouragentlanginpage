// Cloudflare Pages Function: POST /api/waitlist
// Stores emails in a KV namespace bound as WAITLIST (Pages > Settings > Functions > KV bindings).
export async function onRequestPost({ request, env }) {
  let data;
  try { data = await request.json(); } catch { return new Response("bad json", { status: 400 }); }
  const email = String(data.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return new Response("invalid email", { status: 400 });
  }
  if (!env.WAITLIST) return new Response("waitlist storage not configured", { status: 500 });
  const record = { email, source: String(data.source || "").slice(0, 20), at: new Date().toISOString(),
                   country: request.cf && request.cf.country };
  await env.WAITLIST.put(`email:${email}`, JSON.stringify(record));
  return Response.json({ ok: true });
}
