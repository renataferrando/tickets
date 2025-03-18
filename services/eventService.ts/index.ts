import { apiService } from "../apiService";
import { ProfileType } from "@/app/types/profile";
import { EventType } from "@/app/types/event";

export interface EventsResponse {
  events: EventType[];
}

export const eventService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, null>({
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
