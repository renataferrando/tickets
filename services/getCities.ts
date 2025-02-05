import { apiService } from "./apiService";
import { URLSearchParamsConstructor } from "../app/utils/UrlParamsConstructor";

export const locationService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query<unknown, unknown>({
   
      query: (args) => {

        const params = URLSearchParamsConstructor(args);
        console.log(args)
        return {
          url: "/location",
          method: "get",
          params,
        };
      },
      //   providesTags: ["UsersList"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          const { error } = err;
          if (
            error.status !== 500 &&
            error.status !== 404 &&
            error.status !== 403
          ) {
          }
        }
      },
    }),
  }),
});
export const { useGetLocationQuery } = locationService;
