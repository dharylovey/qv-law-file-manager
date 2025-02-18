import { UserAPI } from '@/lib/apiClient';
import { ILoginSchema, IRegisterSchema } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const userAPI = new UserAPI();

export interface ErrorResponse {
  response: {
    data: {
      message: string;
      success: boolean;
      error: string;
    };
  };
}

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await userAPI.getUser();
      return response;
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ILoginSchema) => userAPI.login(data),
    onSuccess: () => {
      toast.success('Login successful');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: ErrorResponse) => {
      const errorMessage =
        error?.response?.data?.error || 'An error occurred during login. Please try again.';
      toast.error(errorMessage);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IRegisterSchema) => userAPI.register(data),
    onSuccess: () => {
      toast.success('Registration successful');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: ErrorResponse) => {
      console.log('Register error', error);
      const errorMessage =
        error?.response?.data?.error || 'An error occurred during registration. Please try again.';
      toast.error(errorMessage);
    },
  });
};
