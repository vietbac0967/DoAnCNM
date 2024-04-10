import axios from "axios";
import { URL_SERVER } from "@env";
console.log("URL_SERVER:::", URL_SERVER);
export const baseURL = axios.create({
  baseURL: `${URL_SERVER}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
