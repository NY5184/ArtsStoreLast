import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const artApi = createApi({
  reducerPath: "artApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7020/art" }),
  endpoints: (builder) => ({
    getArts: builder.query({
      query: () => "/",
    }),
    getArtById: builder.query({
      query: (id) => `/${id}`,
    }),
    createArt: builder.mutation({
      query: (newArt) => ({
        url: "/",
        method: "POST",
        body: newArt,
      }),
    }),
    updateArt: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/${_id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteArt: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    getAverageRating: builder.query({
      query: (id) => `/getAverAgeRate/${id}`, // Matches the backend route
    }),
   
  uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
    
  }),
});



export const {
  useGetArtsQuery,
  useGetArtByIdQuery,
  useCreateArtMutation,
  useUpdateArtMutation,
  useDeleteArtMutation,
  useGetAverageRatingQuery,
  useUploadImageMutation,
} = artApi;
