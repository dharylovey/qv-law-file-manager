'use client';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { IRegisterSchema } from '@/types';
import { registerSchema } from '@/zodSchema';
import PasswordInput from '@/components/ui/password-input';
import { useRouter } from 'next/navigation';
import { register } from '@/server/auth/user';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      lastName: '',
      userName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: IRegisterSchema) => {
    try {
      const result = registerSchema.safeParse(data);
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      const response = await register(formData);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      form.reset();
      toast.success(response.message);
      router.push('/sign-in');
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter details to create a new account.</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  User Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput field={field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Confirm Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput field={field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center">
                <ClipLoader color="#ffffff" size={20} />
                <span className="ml-2">Creating account ...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
        <div className="text-center text-sm">
          {`Already have an account?   `}
          <Link
            href="/sign-in"
            className="font-semibold text-primary hover:underline hover:text-blue-500"
          >
            Sign In
          </Link>
        </div>
      </Form>
    </>
  );
};

export default RegisterForm;
