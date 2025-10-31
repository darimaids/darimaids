import { publicApi } from "..";
import { extractErrorMessage } from "@/utils/errorHandler";

export const getBookings = async (data: any) => {
  try {
    const response = await publicApi.get("/api/v1/booking/getBookings", data);
    // console.log("API response:", response.data);
    return response?.data;
  } catch (error) {
    console.log("Error fetching bookings:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const getPendingBookings = async (data: any) => {
  try {
    const response = await publicApi.get(
      "/api/v1/booking/getAllpendingBookings",
      data
    );
    // console.log("API response:", response.data);
    return response?.data;
  } catch (error) {
    console.log("Error fetching bookings:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const getBookingInfo = async (uid: any) => {
  try {
    const response = await publicApi.get(
      `api/v1/booking/getBooking?bookingId=${uid}`
    );
    // console.log("API response:", response.data);
    return response?.data;
  } catch (error) {
    console.log("Error fetching bookings:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const getPendingBookingInfo = async (uid: any) => {
  try {
    const response = await publicApi.get(
      `api/v1/booking/getPendingBooking?bookingId${uid}`
    );
    // console.log("API response:", response.data);
    return response?.data;
  } catch (error) {
    console.log("Error fetching bookings:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const createBooking = async (data: any) => {
  try {
    const response = await publicApi.post(
      "/api/v1/booking/createBookingPayment",
      data
    );
    // console.log("API response:", response.data);
    return response?.data;
  } catch (error) {
    console.log("Error creating booking:", error);
    throw new Error(extractErrorMessage(error));
  }
};

export const deleteBooking = async (uid: any) => {
  try {
    const response = await publicApi.get(
      `/api/v1/booking/delete?bookingId=${uid}`
    );
    // console.log("API response:", response.data);
    return response?.data;
  } catch (error) {
    console.log("Error fetching bookings:", error);
    throw new Error(extractErrorMessage(error));
  }
};