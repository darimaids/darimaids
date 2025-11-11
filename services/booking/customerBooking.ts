import { publicApi } from "..";
import { extractErrorMessage } from "@/utils/errorHandler";

export const getBookings = async (email: string) => {
  try {
    const response = await publicApi.get(
      `/api/v1/booking/getBookings?email=${email}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error fetching bookings:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const getPendingBookings = async (email: string) => {
  try {
    const response = await publicApi.get(
      `/api/v1/booking/getAllpendingBookings?email=${email}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error fetching pending bookings:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const getBookingInfo = async (uid: string) => {
  try {
    const response = await publicApi.get(
      `/api/v1/booking/getBooking?bookingId=${uid}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error fetching booking info:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const getPendingBookingInfo = async (uid: string) => {
  try {
    const response = await publicApi.get(
      `/api/v1/booking/getPendingBooking?bookingId=${uid}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error fetching pending booking info:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const createBooking = async (data: any) => {
  try {
    const response = await publicApi.post(
      "/api/v1/booking/createBookingPayment",
      data
    );
    return response?.data;
  } catch (error) {
    console.log("Error creating booking:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const deleteBooking = async (uid: string) => {
  try {
    const response = await publicApi.delete(
      `/api/v1/booking/delete?bookingId=${uid}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error deleting booking:", error);
    throw new Error(extractErrorMessage(error));
  }
};
