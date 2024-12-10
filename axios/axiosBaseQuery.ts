import axiosClient from ".";

interface Args {
  url: string;
  method: string;
  [x: string]: any;
}

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers, timeout }: Args) => {
    // const body = !formData ? camelToSnake(data) : data;
    try {
      const result = await axiosClient({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        timeout,
      });

      return { data: result.data };
    } catch (axiosError: any) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
