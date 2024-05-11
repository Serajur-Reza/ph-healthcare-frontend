import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateSingleUser: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/user/update-my-profile",
          method: "PATCH",
          contentType: "multipart/form-data",
          data,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetSingleUserQuery, useUpdateSingleUserMutation } = userApi;
