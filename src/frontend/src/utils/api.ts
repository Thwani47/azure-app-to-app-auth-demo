import axios, { AxiosInstance } from "axios";

const baseURL = import.meta.env.DEV
  ? "https://localhost:7016"
  : "https://azure-app-to-app-auth-demo-api.azurewebsites.net";

const client: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default client;
