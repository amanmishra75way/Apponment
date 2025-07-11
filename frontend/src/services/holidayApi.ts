import { api } from "../store/api";

export interface Holiday {
  _id: string;
  date: string;
  reason?: string;
}

export const holidayApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHolidays: builder.query<Holiday[], void>({
      query: () => "/holidays",
    }),
    addHoliday: builder.mutation<Holiday, { date: string; reason?: string }>({
      query: (body) => ({
        url: "/holidays",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetHolidaysQuery, useAddHolidayMutation } = holidayApi;
