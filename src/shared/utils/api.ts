import API_URL from "./apiConfig";
import axios, { isAxiosError } from "axios";

interface Ticket {
  type: "NORMAL" | "DISCOUNTED";
  number: number;
  price: number;
}

interface OrderData {
  sessionId: string;
  userId: string;
  tickets: Ticket[];
}

const fetchMovieById = async (movieId: string) => {
  try {
    const response = await axios.get(`${API_URL}/movies/${movieId}`);
    return response.data.movie;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error("fetchMovieById failed");
    }
  }
};

const fetchCinemaById = async (cinemaId: string) => {
  try {
    const response = await axios.get(`${API_URL}/cinemas/${cinemaId}`);
    return response.data.cinema;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error("fetchCinemaById failed");
    }
  }
};

const fetchSessionById = async (sessionId: string) => {
  try {
    const response = await axios.get(`${API_URL}/sessions/${sessionId}`);
    return response.data.session;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error("fetchSessionById failed");
    }
  }
};

const placeOrder = async ({ sessionId, userId, tickets }: OrderData) => {
  try {
    const orderData = {
      sessionId,
      userId,
      tickets,
    };
    console.log(orderData);
    console.log(`${API_URL}/purchases`);
    const response = await axios.post(`${API_URL}/purchases/`, orderData);

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("Error placing order:", error.message);
      throw new Error("Faild to place order");
    }
  }
};

export { fetchMovieById, fetchCinemaById, fetchSessionById, placeOrder };
