import { apiService } from "../apiService";
import { CategoryType } from "@/app/types/category";

export const eventService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryType[], null>({
      query: () => {
        return {
          url: "/categories",
          method: "get",
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
export const { useGetCategoriesQuery } = eventService;
