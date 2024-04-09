import axios from "axios";

export const baseURL = axios.create({
  baseURL: "http://172.20.10.7:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
