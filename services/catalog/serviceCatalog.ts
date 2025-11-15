import { publicApi } from "..";
import { extractErrorMessage } from "@/utils/errorHandler";

export const getServices = async () => {
  try {
    const response = await publicApi.get(`/api/v1/catalog/displayAllCatalogs`);
    return response?.data;
  } catch (error) {
    console.log("Error fetching services:", error);
    throw new Error(extractErrorMessage(error));
  }
};
