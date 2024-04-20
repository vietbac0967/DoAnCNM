import axios from "axios";
import { URL_SERVER } from "@env";
export const baseURL = axios.create({
  
  // baseURL: `${URL_SERVER}/api`,
  baseURL: `${URL_SERVER}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
