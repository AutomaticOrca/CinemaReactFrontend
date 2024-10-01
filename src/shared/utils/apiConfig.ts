const API_URL =
  import.meta.env.VITE_APP_NODE_ENV === "development"
    ? "http://localhost:5005/api"
    : "http://ec2-13-54-7-53.ap-southeast-2.compute.amazonaws.com:5005/api";

export default API_URL;
