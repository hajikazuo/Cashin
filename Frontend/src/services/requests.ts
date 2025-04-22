import { ApiSignUp, ApiSignIn, ApiGetUser } from "../@types/Auth";
import { ApiDeleteCategory, ApiGetCategories, ApiGetCategory, ApiUpdateCategory, CategoryRequest } from "../@types/Categories";
import { ApiGetDashboard } from "../@types/Dashboard";
import { PaginationHeader } from "../@types/Pagination";
import { ApiDeleteTransaction, ApiGetTransaction, ApiGetTransactions, ApiUpdateTransaction, TransactionRequest } from "../@types/Transaction";
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
    endpoint: 'api/transaction/getall',
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

export const getTransaction = async (id: string) => {
  return await api<ApiGetTransaction>({
      endpoint: `api/transaction/getbyid/${id}`
  });
}

export const newTransaction = async (transaction: TransactionRequest) => {
  return await api({
    endpoint: "api/transaction/add",
    method: "POST",
    data: transaction
  });
};

export const updateTransaction = async (id: string, transaction: TransactionRequest) => {
  return await api<ApiUpdateTransaction>({
      endpoint: `api/transaction/update/${id}`, 
      method: 'PUT', 
      data: transaction
  });
}

export const deleteTransaction = async (id: string) => {
  return await api<ApiDeleteTransaction>({
      endpoint: `api/transaction/delete/${id}`, 
      method: 'DELETE', 
  });
}

export const getCategories = async () => {
  return await api<ApiGetCategories>({
    endpoint: 'api/category/getall',
  });
};

export const getCategory= async (id: string) => {
  return await api<ApiGetCategory>({
      endpoint: `api/category/getbyid/${id}`
  });
}

export const newCategory = async (category: CategoryRequest) => {
  return await api({
    endpoint: "api/category/add",
    method: "POST",
    data: category,
  });
};

export const updateCategory = async (id: string, category: CategoryRequest) => {
  return await api<ApiUpdateCategory>({
      endpoint: `api/category/update/${id}`, 
      method: 'PUT', 
      data: category
  });
}

export const deleteCategory = async (id: string) => {
  return await api<ApiDeleteCategory>({
      endpoint: `api/category/delete/${id}`, 
      method: 'DELETE', 
  });
}

export const getDashboard = async (
  startDate?: string,
  endDate?: string
) => {
  const response = await api<ApiGetDashboard>({
    endpoint: 'api/dashboard/getdashboarddata',
    data: {
      startDate,
      endDate
    }
  });

  return {
    data: response.data
  };
};

