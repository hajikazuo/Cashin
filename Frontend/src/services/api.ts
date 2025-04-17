import axios, { AxiosError } from "axios";

type Props = {
  endpoint: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: object,
  withAuth?: boolean
};

export const api = async <TypeResponse>({
  endpoint,
  method = 'GET',
  data,
  withAuth = true
}: Props) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
  });

  if (withAuth) {
    const token = localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_AUTH_KEY);
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const request = await instance<TypeResponse>(endpoint, {
      method,
      params: method === 'GET' ? data : undefined,
      data: method !== 'GET' ? data : undefined
    });

    return {
      data: request.data,
      headers: request.headers
    };
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;

    return {
      error: e.response?.data.message ?? e.message
    };
  }
};
