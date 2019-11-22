/* @flow */
import { resolve } from 'path';
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';

export const PUBLIC_KEY = readFileSync(
  resolve(__dirname, 'jwt.public.key'),
  'utf8',
);

const PRIVATE_KEY = readFileSync(resolve(__dirname, 'jwt.private.key'), 'utf8');

export const TYPE_ACCESS = '@@TYPE_ACCESS';

export const TYPE_REFRESH = '@@TYPE_REFRESH';

export const sign = (
  payload: string | Object,
  expiresIn?: string | number = 86400,
): string => jwt.sign(payload, PRIVATE_KEY, { expiresIn, algorithm: 'RS256' });

export const verify = (token: string): any =>
  jwt.verify(token, PUBLIC_KEY, { algorithms: 'RS256' });
