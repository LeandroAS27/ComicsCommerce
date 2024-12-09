import crypto from 'crypto';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { timestamp } = req.query;

  if (!timestamp) {
    return res.status(400).json({ error: 'Timestamp é obrigatório.' });
  }

  const publicKey = process.env.VITE_MARVEL_PUBLIC_KEY;
  const privateKey = process.env.VITE_MARVEL_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    return res.status(500).json({ error: 'Chaves da API não configuradas.' });
  }

  const hash = crypto
    .createHash('md5')
    .update(`${timestamp}${privateKey}${publicKey}`)
    .digest('hex');

  res.status(200).json({ hash });
}