import { TMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctorSchedule: build.mutation({
      query: (data) => ({
        url: "/doctor-schedule",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),

    getAllDoctorSchedules: build.query({
      query: (args: Record<string, any>) => ({
        url: "/doctor-schedule",
        method: "GET",
        params: args,
      }),

      transformResponse: (response: [], meta: TMeta) => {
        return {
          schedules: response,
          meta,
        };
      },

      providesTags: [tagTypes.doctorSchedule],
    }),

    getDoctorSchedule: build.query({
      query: (id) => {
        console.log(id);
        return {
          url: `/doctor-schedule/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.doctorSchedule],
    }),

    getMyDoctorSchedule: build.query({
      query: () => {
        return {
          url: `/doctor-schedule/my-schedule`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.doctorSchedule],
    }),

    deleteDoctorSchedule: build.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/doctor-schedule/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.doctorSchedule],
    }),
  }),
});

export const {
  useCreateDoctorScheduleMutation,
  useGetAllDoctorSchedulesQuery,
  useGetDoctorScheduleQuery,
  useGetMyDoctorScheduleQuery,
  useDeleteDoctorScheduleMutation,
} = scheduleApi;
