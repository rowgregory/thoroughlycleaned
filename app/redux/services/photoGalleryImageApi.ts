import { api } from "./api";

const BASE_URL = "/photo-gallery";

export const photoGalleryImageApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchPhotoGalleryImages: build.query({
      query: () => `${BASE_URL}/fetch-photo-gallery-images`,
      providesTags: ["Photo-Gallery"],
    }),
    createPhotoGalleryProject: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/create-photo-gallery-project`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Photo-Gallery"],
    }),
    fetchPhotoGalleryProjects: build.query({
      query: () => `${BASE_URL}/fetch-photo-gallery-projects`,
      providesTags: ["Photo-Gallery"],
    }),
    updatePhotoGalleryProject: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/update-photo-gallery-project`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Photo-Gallery"],
    }),
    createAndAttachPhotoGalleryImage: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/create-and-attach-photo-gallery-image`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Photo-Gallery"],
    }),
    deletePhotoGalleryProjectPair: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/delete-photo-gallery-project-pair`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Photo-Gallery"],
    }),
    deletePhotoGalleryProject: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/delete-photo-gallery-project`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Photo-Gallery"],
    }),
    photoGallerySystemStatus: build.query({
      query: () => `${BASE_URL}/system-status`,
      providesTags: ["Client-Lead"],
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useFetchPhotoGalleryImagesQuery,
  useCreatePhotoGalleryProjectMutation,
  useFetchPhotoGalleryProjectsQuery,
  useUpdatePhotoGalleryProjectMutation,
  useCreateAndAttachPhotoGalleryImageMutation,
  useDeletePhotoGalleryProjectPairMutation,
  useDeletePhotoGalleryProjectMutation,
  usePhotoGallerySystemStatusQuery,
} = photoGalleryImageApi;
