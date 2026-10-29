import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Simple per-instance rate limit
const hits = new Map<string, number[]>()

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const now = Date.now()
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000)
    if (recent.length >= 5) return json({ error: 'Too many messages. Please wait a minute.' }, 429)
    hits.set(ip, [...recent, now])

    const b = await req.json().catch(() => ({}))
    const data = {
      name: str(b.name, 100),
      email: str(b.email, 255),
      country: str(b.country, 100),
      zip: str(b.zip, 20),
      roles: Array.isArray(b.roles) ? b.roles.filter((r: unknown) => typeof r === 'string').slice(0, 3).join(', ').slice(0, 60) : '',
      subject: str(b.subject, 200),
      message: str(b.message, 5000),
    }
    if (!data.name || !EMAIL_RE.test(data.email) || !data.country || !data.zip || !data.roles) {
      return json({ error: 'Please fill in all required fields with valid values.' }, 400)
    }

    const result = await sendTemplateEmail('contact-notification', 'makehug44@gmail.com', {
      templateData: data,
      replyTo: data.email,
      idempotencyKey: `contact-notification-${crypto.randomUUID()}`,
    })
    if (!result.sent) return json({ error: 'The message could not be delivered.' }, 502)
    return json({ ok: true })
  } catch (e) {
    console.error('send-contact-message failed', e)
    return json({ error: e instanceof Error ? e.message : 'Unknown error' }, 500)
  }
})
