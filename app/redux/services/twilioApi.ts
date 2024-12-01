import { api } from "./api";

const BASE_URL = "/twilio";

export const twilioApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    sendTwilioWhatsAppMessage: build.mutation({
      query: (message: string) => ({
        url: `${BASE_URL}/post/sendWhatsAppMessage?endpoint=SEND_TWILIO_WHATSAPP_MESSAGE`,
        method: "POST",
        body: message,
      }),
      providesTags: ["Twilio"],
    }),
    sendTwilioSMSMessage: build.mutation({
      query: (code: string) => ({
        url: `${BASE_URL}/post?endpoint=SEND_TWILIO_SMS_MESSAGE`,
        method: "POST",
        body: code,
      }),
      providesTags: ["Twilio"],
    }),
  }),
});

export const {
  useSendTwilioWhatsAppMessageMutation,
  useSendTwilioSMSMessageMutation,
} = twilioApi;
