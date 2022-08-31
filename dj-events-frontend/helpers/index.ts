import type { NextApiRequest } from 'next';
import cookie from 'cookie';

export function parseCookies(req: NextApiRequest) {
  return cookie.parse(req ? req.headers.cookie || '' : '');
}
