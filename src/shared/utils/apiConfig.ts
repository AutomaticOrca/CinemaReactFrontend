const API_URL =
  import.meta.env.VITE_APP_NODE_ENV === "development"
    ? "http://localhost:5005/api"
    : "https://cinema-mern-backend.vercel.app/api/cinemas";

export default API_URL;
