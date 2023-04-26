import axios, { AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

console.log(import.meta.env)

console.log(baseURL);

const client: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default client;
