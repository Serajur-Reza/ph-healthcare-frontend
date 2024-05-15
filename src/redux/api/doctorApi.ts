import { TMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
import { TDoctor } from "@/types/doctor";

const doctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query: (data) => ({
        url: "/user/create-doctor",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),

    getAllDoctors: build.query({
      query: (args: Record<string, any>) => ({
        url: "/doctor",
        method: "GET",
        params: args,
      }),

      transformResponse: (response: TDoctor[], meta: TMeta) => {
        return {
          doctors: response,
          meta,
        };
      },

      providesTags: [tagTypes.doctor],
    }),

    getSingleDoctor: build.query({
      query: (id: string | string[] | undefined) => {
        console.log(id);
        return {
          url: `/doctor/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.doctor],
    }),

    updateDoctor: build.mutation({
      query: (data) => {
        return {
          url: `/doctor/${data.id}`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.doctor],
    }),

    deleteDoctor: build.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/doctor/soft/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.doctor, tagTypes.user],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorsQuery,
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;
