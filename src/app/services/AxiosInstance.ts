import axios from "axios";
import { getSession } from "next-auth/react";

const defaultOptions = {
  baseURL: "http://localhost:1234",
  headers: {
    "Content-Type": "application/json",
  },
};

export let AxiosInstance = axios.create(defaultOptions);

AxiosInstance.interceptors.request.use(async function (config) {
  const session = await getSession();
  config.headers.Authorization = `${session?.user?.accessToken}`;
  return config;
});
AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    window.location.href = "/user/logout";
  }
);
