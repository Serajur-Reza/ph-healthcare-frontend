import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const specialitiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpeciality: build.mutation({
      query: (data) => ({
        url: "/specialities",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialities],
    }),

    getAllSpecialities: build.query({
      query: () => ({
        url: "/specialities",
        method: "GET",
      }),

      providesTags: [tagTypes.specialities],
    }),

    deleteSpeciality: build.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/specialities/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.specialities],
    }),
  }),
});

export const {
  useCreateSpecialityMutation,
  useGetAllSpecialitiesQuery,
  useDeleteSpecialityMutation,
} = specialitiesApi;
