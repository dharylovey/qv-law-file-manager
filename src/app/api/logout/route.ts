import { deleteSession } from '@/server/utils/session';
import { error } from 'console';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await deleteSession();
    return NextResponse.json(
      {
        success: true,
        message: 'User logged out successfully',
        error: error,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error logging out user', error: error },
      { status: 500 }
    );
  }
}
