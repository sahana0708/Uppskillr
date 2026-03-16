import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface TokenPayload {
  id: string;
  email: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as any);
};

export const generateRefreshToken = (): string => {
  return jwt.sign({}, env.JWT_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  } as any);
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

export const getRefreshTokenExpiry = (): Date => {
  const expiresInSeconds = parseInt(env.REFRESH_TOKEN_EXPIRES_IN) * 24 * 60 * 60; // Convert days to seconds
  return new Date(Date.now() + expiresInSeconds * 1000);
};
