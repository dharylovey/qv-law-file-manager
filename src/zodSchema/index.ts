import { z } from 'zod';

export const loginSchema = z.object({
  userName: z
    .string()
    .min(1, 'Username is required.')
    .max(50, { message: 'Username must be less than 50 characters.' }),
  password: z
    .string()
    .min(1, 'Password is required.')
    .max(50, { message: 'Password must be less than 50 characters.' })
    .regex(/^(?=.*[A-Z])(?=.*[\W_])(?!.*\s).+$/, {
      message:
        'Password must contain at least one uppercase letter, one special character, and no spaces.',
    }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, { message: 'Name must be less than 50 characters.' }),
    lastName: z.string().max(50, { message: 'Last name must be less than 50 characters.' }),
    userName: z
      .string({ message: 'User name is required' })
      .min(1, 'Name is required')
      .max(50, { message: 'Name must be less than 50 characters.' }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?~`-])(?!.*\s)[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?~`-]{8,}$/,
        {
          message:
            'Password must be at least 8 characters, contain at least one uppercase letter, one number, one special character, and no spaces.',
        }
      ),
    confirmPassword: z.string({ message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const fileSchema = z.object({
  fileNumber: z.string().min(1, 'File number is required'),
  title: z.string().min(1, 'Title is required'),
  name: z.string().min(1, 'Name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export const fileType = fileSchema.extend({
  id: z.string(),
});
