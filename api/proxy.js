export default async function handler(req, res) {
  // header CORS supaya front-end bisa request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    if (req.method === 'GET') {
      const response = await fetch(url.toString());
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === 'PUT') {
      const body = req.body;
      const response = await fetch(url.toString(), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    return res.status(405).send('Method Not Allowed');
  } catch (err) {
    return res.status(500).send('Failed to fetch: ' + err.message);
  }
}
