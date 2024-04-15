import axios from "axios";
import { URL_SERVER } from "@env";
console.log("URL_SERVER:::", URL_SERVER);
export const baseURL = axios.create({
  // baseURL: `${URL_SERVER}/api`,
  baseURL: "http://192.168.0.6:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
