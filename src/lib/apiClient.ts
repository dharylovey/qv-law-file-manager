import { ILoginSchema, IRegisterSchema } from '@/types';
import axios from 'axios';
import { JWTPayload } from 'jose';

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export class UserAPI {
  getUser = async () => {
    const response = await apiClient.get<JWTPayload>('/verify-session', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  login = async (data: ILoginSchema) => {
    const response = await apiClient.post<ILoginSchema>('/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  };

  register = async (data: IRegisterSchema) => {
    const response = await apiClient.post<IRegisterSchema>('/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Request data:', data);
    console.log('Request headers:', response.config.headers);

    return response.data;
  };

  logout = async () =>
    await apiClient.delete('/logout', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
}
