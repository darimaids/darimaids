// utils/errorHandler.ts
import { AxiosError } from "axios";

export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError)
    return error.response?.data?.message || error.message;
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
};
