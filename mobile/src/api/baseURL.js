import axios from "axios";
import { URL_SERVER } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const baseURL = axios.create({
  // baseURL: `${URL_SERVER}/api`,
  baseURL: `${URL_SERVER}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = axios.create({
  baseURL: `${URL_SERVER}/api`,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};
// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const token = await AsyncStorage.getItem("refreshToken");
        console.log("token refresh:::", token);
        const response = await axios.post(
          `${URL_SERVER}/api/auth/refreshToken`,
          {
            token,
          }
        );
        const { DT, EC, EM } = response.data;
        if (EC === 0 && EM === "Success") {
          const { accessToken, refreshToken } = DT;
          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          processQueue(null, accessToken);
          return api(originalRequest);
        } else {
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");
          throw new Error(EM);
        }
        // Retry the original request with the new token
      } catch (error) {
        // await AsyncStorage.removeItem("accessToken");
        // await AsyncStorage.removeItem("refreshToken");
        // Handle refresh token error or redirect to login
        processQueue(error, null);
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        console.log("Refresh token error", error);
        // Redirect to login
        throw new Error("Refresh token error");
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
