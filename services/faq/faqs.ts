import { publicApi } from "..";
import { extractErrorMessage } from "@/utils/errorHandler";

export const getFaqs = async () => {
  try {
    const response = await publicApi.get(`/api/v1/faq/getFaqs`);
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
