import axios from "axios";
import { URL_SERVER } from "@env";
export const baseURL = axios.create({
  // baseURL: `${URL_SERVER}/api`,
  baseURL: "http://172.20.10.4:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
