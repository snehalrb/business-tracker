import axios from "axios";

//in production there is no local host , make it dynamic
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:6001/business-tracker"
    : "https://your-backend-service.onrender.com/business-tracker";

export const endpoint = axios.create({
  baseURL: BASE_URL,
});
