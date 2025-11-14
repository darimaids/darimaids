import { privateApi } from "..";
import { extractErrorMessage } from "@/utils/errorHandler";

export const getBanks = async () => {
  try {
    const response = await privateApi.get(`/api/v1/bank/getBank`);
    return response?.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return {
        success: false,
        message: "Bank account not found",
        data: [],
      };
    }

    console.log("Error fetching bookings:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const postBank = async (data: any) => {
  try {
    const response = await privateApi.post(`/api/v1/bank/createBank`, data);
    return response?.data;
  } catch (error) {
    console.log("Error posting bank info:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const editBankInformation = async (uid: string, data: any) => {
  try {
    const response = await privateApi.put(`/api/v1/bank/updateBank/${uid}`, data);
    return response?.data;
  } catch (error) {
    console.log("Error editing bank info:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const deleteBankInformation = async (uid: string) => {
  try {
    const response = await privateApi.delete(
      `/api/v1/bank/deleteBank?bankId=${uid}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error deleting bank info:", error);
    throw new Error(extractErrorMessage(error));
  }
};
