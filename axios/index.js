


import axios from "axios";
// import { getAccessToken, getSession } from "@auth0/nextjs-auth0";


// import globalRouter from "../globalRouter";
// import { getToken } from "../security";
import { getToken } from "@/helpers/security";
// const BASE_URL = import.meta.env.VITE_APP_API_URL;

const axiosClient = axios.create({
  timeout: 10000,
  //baseURL: BASE_URL,
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
  const token = await getToken.getAccessTokenSilently()();
    return {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` },
    };
  },
  (error) => {
    Promise.reject(error);
  }
);

// axiosClient.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     const res = error.response;

//     if (res.status == 404 && globalRouter.navigate) {
//       globalRouter.navigate("/not-found");
//     } else if (res.status == 500 && globalRouter.navigate) {
//       globalRouter.navigate("/error");
//     } else if (res.status == 403 && globalRouter.navigate) {
//       globalRouter.navigate("/forbidden");
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
