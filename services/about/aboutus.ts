import { publicApi } from "..";
import { extractErrorMessage } from "@/utils/errorHandler";

export const getAbout = async () => {
  try {
    const response = await publicApi.get(`/api/v1/aboutus/getAboutus`);
    return response?.data;
  } catch (error) {
    console.log("Error fetching services:", error);
    throw new Error(extractErrorMessage(error));
  }
};
