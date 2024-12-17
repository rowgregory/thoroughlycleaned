import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imgbbApi = createApi({
  reducerPath: "imgbbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.imgbb.com/1/" }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      async queryFn(file: File) {
        try {
          const formData = new FormData();
          formData.append("image", file);
          formData.append("isGalleryImage", "true");

          const imgBBResponse = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!imgBBResponse.ok) {
            throw new Error("Failed to upload image to ImgBB");
          }

          const data = await imgBBResponse.json();
          return { data };
        } catch (error: any) {
          console.error("Error during image processing:", error);
          return {
            error: error.message || "An error occurred during image processing",
          };
        }
      },
    }),
  }),
});

export const { useUploadImageMutation } = imgbbApi;
