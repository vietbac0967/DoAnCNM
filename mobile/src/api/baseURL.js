import axios from "axios";

export const baseURL = axios.create({
  baseURL: "http://192.168.0.104:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
