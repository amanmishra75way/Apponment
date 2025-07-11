import { api } from "../store/api";

interface AppointmentInput {
  userId: string;
  date: string;
  timeSlot: string;
  serviceType: string;
  notes?: string;
}

export interface Appointment {
  _id: string;
  userId: string;
  staffId?: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  status: "booked" | "completed" | "cancelled" | "rescheduled";
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const appointmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    bookAppointment: builder.mutation<any, AppointmentInput>({
      query: (appointment) => ({
        url: "/appointments",
        method: "POST",
        body: appointment,
      }),
    }),
    getUserAppointments: builder.query<Appointment[], string>({
      query: (userId) => `/appointments/user/${userId}`,
    }),
    cancelAppointment: builder.mutation<any, string>({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: "PUT",
      }),
    }),
    rescheduleAppointment: builder.mutation<any, { id: string; data: { date: string; timeSlot: string } }>({
      query: ({ id, data }) => ({
        url: `/appointments/${id}/reschedule`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllAppointments: builder.query<Appointment[], void>({
      query: () => `/appointments/admin`,
    }),
    completeAppointment: builder.mutation<any, string>({
      query: (id) => ({
        url: `/appointments/${id}/complete`,
        method: "PUT",
      }),
    }),
    sendReminder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/appointments/${id}/send-reminder`,
        method: "POST",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useBookAppointmentMutation,
  useGetUserAppointmentsQuery,
  useCancelAppointmentMutation,
  useRescheduleAppointmentMutation,
  useGetAllAppointmentsQuery,
  useCompleteAppointmentMutation,
  useSendReminderMutation,
} = appointmentApi;
