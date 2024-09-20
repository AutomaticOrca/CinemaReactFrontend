const API_URL =
  import.meta.env === "development"
    ? "http://localhost:5005/api"
    : "http://13.54.7.53:5173/";

export default API_URL;
