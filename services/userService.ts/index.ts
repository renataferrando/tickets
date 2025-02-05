import { apiService } from "../apiService";
import { ProfileType } from "@/app/types/profile";

export const usersService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<unknown, unknown>({
      query: () => {
        return {
          url: "/users",
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
    getProfile: builder.query<ProfileType, unknown>({
      query: () => {
        return {
          url: "/profile",
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
export const { useGetUsersQuery, useGetProfileQuery } = usersService;
