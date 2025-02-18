import { checkUserName, createUser } from '@/server/auth/services';
import { hashPassword } from '@/server/utils/bycrypt';
import { registerSchema } from '@/zodSchema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error.message,
          success: false,
          message: 'Error registering user',
        },
        { status: 400 }
      );
    }

    const { name, userName, lastName, password } = result.data;
    const hashValue = await hashPassword(password);
    const existUser = await checkUserName(userName);

    if (existUser) {
      return NextResponse.json(
        {
          error: `${existUser.userName} already exists`,
          success: false,
          message: 'Error registering user ',
        },
        { status: 400 }
      );
    }

    const user = await createUser(name, userName, lastName, hashValue);
    if (!user) {
      return NextResponse.json({ success: false, message: 'Error Creating User' }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        user: {
          name: user.name,
          userName: user.userName,
          lastName: user.lastName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}
