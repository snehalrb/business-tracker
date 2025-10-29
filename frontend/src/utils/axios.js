import axios from "axios";

export const endpoint = axios.create({
  baseURL: "http://localhost:6001/business-tracker",
});
