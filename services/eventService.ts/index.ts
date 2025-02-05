import { apiService } from "../apiService";
import { ProfileType } from "@/app/types/profile";

export const eventService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<unknown, unknown>({
      query: () => {
        return {
          url: "/events",
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
    addNewEvent: builder.mutation<ProfileType, unknown>({
      query: (body) => {
        return {
          url: "/events",
          method: "POST",
          data: body
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
export const { useGetEventsQuery, useAddNewEventMutation } = eventService;
