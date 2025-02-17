import { User } from '@prisma/client';
import prisma from '../database/database';

export const createUser = async (
  name: string,
  userName: string,
  lastName: string,
  password: string
): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      name,
      userName,
      lastName,
      password,
    },
  });

  return user;
};

export const checkUserName = async (userName: string) =>
  prisma.user.findFirst({ where: { userName } });
