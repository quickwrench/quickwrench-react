import axios from "axios";
import { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default client;
