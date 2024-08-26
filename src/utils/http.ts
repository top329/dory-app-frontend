import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const requestHandler = async (request: InternalAxiosRequestConfig) => {
  const token = typeof window !== 'undefined' && window.sessionStorage.getItem('accessToken');

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
};

const successHandler = (response: AxiosResponse) => {
  return response;
};

interface CustomAxiosError extends AxiosError {
  config: InternalAxiosRequestConfig & { isCustomErrorMessage?: boolean };
  code?: string;
  request?: unknown;
  response?: AxiosResponse;
}

const errorHandler = (error: CustomAxiosError) => {
  if (!error.config.isCustomErrorMessage) {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error(error);
    }
  }

  return Promise.reject(error.response ? error.response : error);
};

http.interceptors.request.use(request => requestHandler(request));

http.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);
