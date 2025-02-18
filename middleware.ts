import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/server/utils/session';

export async function middleware(request: NextRequest) {
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
