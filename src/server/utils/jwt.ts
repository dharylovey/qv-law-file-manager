import { jwtVerify, SignJWT } from 'jose';
import { SessionPayload } from '@/types';

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey);
    return {
      success: true,
      message: 'Valid token',
      payload,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Invalid token',
      error: error,
    };
  }
}
