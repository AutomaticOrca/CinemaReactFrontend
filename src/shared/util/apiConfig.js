const API_URL =
  import.meta.env === "development"
    ? "http://localhost:5005/api"
    : "http://13.54.7.53:5005/api";

export default API_URL;
