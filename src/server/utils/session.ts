import { cookies } from 'next/headers';
import { decrypt, encrypt } from './jwt';
import { redirect } from 'next/navigation';

export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours

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

export async function verifySession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('qv_law_session')?.value;
  const session = await decrypt(cookie);

  console.log('Decrypted session', session);

  if (!session.token) {
    return redirect('/sign-in');
  }

  return { isAuth: true, userId: session.token };
}

export async function updateSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('qv_law_session');
  const session = await decrypt(cookie?.value);

  if (!cookie || !session.token) {
    return null;
  }
  const expires = new Date(Date.now() + 12 * 60 * 60 * 1000);
  cookieStore.set('qv_law_session', JSON.stringify(session), {
    expires: expires,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('qv_law_session');
}
