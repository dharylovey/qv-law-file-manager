import { User } from '@prisma/client';
import prisma from '../database/database';
import { hashPassword } from '../utils/bycrypt';

export const createUser = async (
  name: string,
  userName: string,
  lastName: string,
  password: string
): Promise<User> => {
  const hashValue = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      userName,
      lastName,
      password: hashValue,
    },
  });

  return user;
};

export const checkUserName = async (userName: string) =>
  prisma.user.findUnique({ where: { userName } });
