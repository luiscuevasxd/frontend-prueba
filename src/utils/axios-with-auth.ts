import { tokenService } from '@services';
import axios, { AxiosInstance } from 'axios';

export const createAxiosWithAuth = (baseURL: string): AxiosInstance => {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use((config) => {
    const token = tokenService.getToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
};

export const api = createAxiosWithAuth(process.env.NEXT_PUBLIC_API_URL ?? '');
