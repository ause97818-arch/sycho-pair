const BOT_SERVER = process.env.BOT_SERVER || 'http://localhost:3000';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const phone = req.query.phone;
  if (!phone) return res.status(400).json({ error: 'Phone required' });

  try {
    const r = await fetch(`${BOT_SERVER}/pair?phone=${phone.replace(/\D/g,'')}`);
    const d = await r.json();
    return res.status(r.status).json(d);
  } catch (e) {
    return res.status(502).json({ error: 'Bot server unreachable' });
  }
}
