import { verifySession } from '@/server/utils/session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const verifiedUser = await verifySession();

    if (!verifiedUser.isAuth) {
      return NextResponse.json(verifiedUser, { status: 401 });
    }
    return NextResponse.json(
      {
        success: true,
        message: 'User verified successfully',
        user: verifiedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error verifying user',
      error: error,
    });
  }
}
