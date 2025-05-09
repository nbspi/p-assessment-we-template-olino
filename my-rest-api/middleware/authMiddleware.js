// middleware/authMiddleware.js
// PURPOSE: Protect write routes by checking for an Authorization header

export default function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: missing token' });
  }
  const token = header.split(' ')[1];
  // TODO: verify token here (e.g. jwt.verify(token, secret))
  // For now, assume any non‐empty token is OK:
  if (token.length === 0) {
    return res.status(401).json({ error: 'Unauthorized: empty token' });
  }
  next();
}
