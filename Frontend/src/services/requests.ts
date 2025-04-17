import { ApiSignUp, ApiSignIn, ApiGetUser } from "../@types/Auth";
import { ApiGetCategories } from "../@types/Categories";
import { PaginationHeader } from "../@types/Pagination";
import { ApiGetTransactions } from "../@types/Transaction";
import { api } from "./api";

export const signUp = async (name: string, email: string, password: string) => {
  return await api<ApiSignUp>({
    endpoint: "api/auth/signup",
    method: "POST",
    data: { name, email, password },
    withAuth: false,
  });
};

export const signIn = async (email: string, password: string) => {
  return await api<ApiSignIn>({
    endpoint: "api/auth/signin",
    method: "POST",
    data: { email, password },
    withAuth: false,
  });
};

export const getUser = async () => {
  return await api<ApiGetUser>({
    endpoint: "api/auth/me",
  });
};

export const getTransactions = async (
  page: number,
  pageSize: number = 25,
  startDate?: string,
  endDate?: string
) => {
  const response = await api<ApiGetTransactions>({
    endpoint: 'api/transaction',
    data: {
      pageNumber: page,
      pageSize,
      startDate,
      endDate
    }
  });

  const paginationHeader: PaginationHeader = JSON.parse(response.headers?.['pagination']);

  return {
    data: response.data,
    headers: paginationHeader
  };
};

export const getCategories = async (
  page: number,
  pageSize: number = 25
) => {
  const response = await api<ApiGetCategories>({
    endpoint: 'api/category/getall',
    data: {
      pageNumber: page,
      pageSize
    }
  });

  const paginationHeader: PaginationHeader = JSON.parse(response.headers?.['pagination']);

  return {
    data: response.data,
    headers: paginationHeader
  };
};


