import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://react-project-puce-eta.vercel.app/data/data.json",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;
