import { checkUserName } from '@/server/auth/services';
import { comparePassword } from '@/server/utils/bycrypt';
import { createSession } from '@/server/utils/session';
import { loginSchema } from '@/zodSchema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error.message,
          success: false,
          message: 'Invalid email or password',
        },
        { status: 400 }
      );
    }

    const { userName, password } = result.data;
    const existUser = await checkUserName(userName);
    if (!existUser) {
      return NextResponse.json(
        {
          error: 'User  not found',
          success: false,
          message: 'User  not found',
        },
        { status: 404 }
      );
    }

    const isPasswordMatch = await comparePassword(password, existUser.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          error: 'Invalid email or password',
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    await createSession(existUser.id);

    return NextResponse.json(
      {
        success: true,
        message: 'User  logged in successfully',
        user: {
          id: existUser.id,
          name: existUser.name,
          userName: existUser.userName,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        success: false,
        message: 'Error logging in',
      },
      { status: 500 }
    );
  }
}
