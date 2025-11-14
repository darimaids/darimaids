import { privateApi } from "..";
import { extractErrorMessage } from "@/utils/errorHandler";

export const getAllAssignedBookings = async () => {
  try {
    const response = await privateApi.get(
      `/api/v1/cleaner/getAllAssignedBookings`
    );
    return response?.data;
  } catch (error: any) {
    // ⛔ SPECIAL HANDLING for 404 "No bookings found"
    if (error.response?.status === 404) {
      return {
        success: false,
        message: "No bookings found",
        data: [],
      };
    }

    console.log("Error fetching bookings:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const acceptBooking = async (uid: string) => {
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

export const rejectBooking = async (uid: string) => {
  try {
    const response = await privateApi.patch(
      `/api/v1/cleaner/cancelBooking?bookingId=${uid}`
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
