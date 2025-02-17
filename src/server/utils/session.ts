import { cookies } from 'next/headers';
import { encrypt } from './jwt';

export const createSession = async (userId: string): Promise<void> => {
  const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set('qv_law_session', session, {
    expires: expiresAt,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
};
