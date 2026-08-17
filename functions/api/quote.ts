interface Env {
  RESEND_API_KEY: string;
  LEAD_TO_EMAIL: string;
  LEAD_FROM_EMAIL: string;
}

interface QuotePayload {
  space?: string;
  size?: string;
  condition?: string[];
  style?: string;
  name?: string;
  phone?: string;
  email?: string;
  zip?: string;
  contact_method?: string;
  message?: string;
  website?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  let body: QuotePayload;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  // Honeypot: real users never see or fill this field, bots that autofill every field will.
  if (body.website) {
    return json({ ok: true }, 200);
  }

  const name = (body.name ?? '').trim();
  const phone = (body.phone ?? '').trim();

  if (!name || !phone) {
    return json({ ok: false, error: 'Name and phone are required.' }, 400);
  }

  const email = (body.email ?? '').trim();
  const zip = (body.zip ?? '').trim();
  const message = (body.message ?? '').trim();
  const space = (body.space ?? '').trim();
  const size = (body.size ?? '').trim();
  const style = (body.style ?? '').trim();
  const condition = Array.isArray(body.condition) ? body.condition.join(', ') : '';
  const contactMethod = (body.contact_method ?? '').trim();

  const rows: [string, string][] = [
    ['Name', name],
    ['Phone', phone],
    ['Email', email || '—'],
    ['Project address / ZIP', zip || '—'],
    ['Preferred contact method', contactMethod || '—'],
    ['Space type', space || '—'],
    ['Approx. size', size || '—'],
    ['Current condition', condition || '—'],
    ['Style interest', style || '—'],
    ['Additional notes', message || '—'],
  ];

  const html = `<h2>New quote request — JAC Surface Coatings</h2>
<table cellpadding="6" cellspacing="0" border="0">
${rows.map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`).join('\n')}
</table>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

  let resendRes: Response;
  try {
    resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.LEAD_FROM_EMAIL,
        to: env.LEAD_TO_EMAIL,
        reply_to: email || undefined,
        subject: `New quote request from ${name}`,
        html,
        text,
      }),
    });
  } catch (err) {
    console.error('Resend request failed:', err);
    return json({ ok: false, error: 'Failed to send notification email.' }, 502);
  }

  if (!resendRes.ok) {
    console.error('Resend error:', await resendRes.text());
    return json({ ok: false, error: 'Failed to send notification email.' }, 502);
  }

  return json({ ok: true }, 200);
};
