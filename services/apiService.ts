/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "@/axios/axiosBaseQuery";

export const apiService = createApi({
  reducerPath: "", // optional,
  tagTypes: [],
  baseQuery: axiosBaseQuery(),
  endpoints: (_builder) => ({})
});
