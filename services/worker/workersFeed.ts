import { privateApi } from "..";
import { extractErrorMessage } from "@/utils/errorHandler";

export const getAllAssignedBookings = async () => {
  try {
    const response = await privateApi.get(
      `/api/v1/cleaner/getAllAssignedBookings`
    );
    return response?.data;
  } catch (error) {
    console.log("Error fetching bookings:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const acceptorrejectBooking = async (uid: string) => {
  try {
    const response = await privateApi.patch(
      `/api/v1/cleaner/acceptOrRejectBookings?bookingId=${uid}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error fetching booking info:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const viewBookingInfo = async (uid: string) => {
  try {
    const response = await privateApi.get(
      `/api/v1/cleaner/getBookingById?bookingId=${uid}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error fetching booking info:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const updateBookingStatus = async (uid: string) => {
  try {
    const response = await privateApi.patch(
      `/api/v1/cleaner/completedCleaningService?bookingId=${uid}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error fetching booking info:", error);
    throw new Error(extractErrorMessage(error));
  }
};
