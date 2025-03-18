import axios from "axios";
import { getToken } from "@/app/helpers/security";

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
