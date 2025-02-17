'use server';

import { loginSchema, registerSchema } from '@/zodSchema';
import { comparePassword, hashPassword } from '../utils/bycrypt';
import { createUser, checkUserName } from './services';
import { createSession } from '../utils/session';

export const register = async (data: FormData) => {
  const dataObj = Object.fromEntries(data.entries());
  try {
    const result = registerSchema.safeParse(dataObj);
    if (!result.success) {
      return { error: result.error.message, success: false, message: 'Error registering user' };
    }

    const { name, userName, lastName, password } = result.data;

    const hashValue = await hashPassword(password);

    const existUser = await checkUserName(userName);

    if (existUser) {
      return {
        error: `${existUser} already exists`,
        success: false,
        message: 'User already exists',
      };
    }

    const user = await createUser(name, userName, lastName, hashValue);

    if (!user) {
      return { success: false, message: 'Error Creating User' };
    }

    return {
      success: true,
      message: 'User created successfully',
      user: {
        name: user.name,
        userName: user.userName,
        lastName: user.lastName,
      },
    };
  } catch (error) {
    return { error: error, success: false, message: 'Error registering user' };
  }
};

export const login = async (data: FormData) => {
  const dataObj = Object.fromEntries(data.entries());
  try {
    const result = loginSchema.safeParse(dataObj);

    if (!result.success) {
      return { error: result.error.message, success: false, message: 'Invalid email or password' };
    }

    const { userName, password } = result.data;

    const existUser = await checkUserName(userName);

    if (!existUser) {
      return { error: `${existUser} not found`, success: false, message: 'User not found' };
    }

    const isPasswordMatch = await comparePassword(password, existUser.password);

    if (!isPasswordMatch) {
      return {
        error: 'Invalid email or password',
        success: false,
        message: 'Invalid email or password',
      };
    }

    await createSession(existUser.id);

    return {
      success: true,
      message: 'Login successful',
      redirect: '/dashboard',
      user: {
        name: existUser.name,
        userName: existUser.userName,
        lastName: existUser.lastName,
      },
    };
  } catch (error) {
    return { error: error, success: false, message: 'Error logging in user' };
  }
};
