import { Reducer, createSlice } from "@reduxjs/toolkit";
import { textBlockApi } from "../services/textBlockApi";

export interface FileBlockTypes {
  value: string;
  mimeType: string;
  fileName?: string;
}

export interface AboutBlock {
  aboutBlockSubtitle: string;
  aboutBlockParagraph: string;
  aboutBlockServiceCategoryOne: string;
  aboutBlockServiceCategoryOneDesc: string;
  aboutBlockServiceCategoryTwo: string;
  aboutBlockServiceCategoryThree: string;
  aboutBlockServiceCategoryTwoDesc: string;
  aboutBlockServiceCategoryThreeDesc: string;
  aboutBlockTitle: string;
  aboutBlockFile: FileBlockTypes;
  aboutBlockLeafValue: string;
  aboutBlockLeafText: string;
}

export interface HomePageClientLeadBlock {
  clientLeadFormTitle: string;
}

export interface HomePageBannerBlock {
  homePageBannerSubtitle: string;
  homePageBannerTitle: string;
  homePageBannerFile: FileBlockTypes;
  homePageBannerImageFile: FileBlockTypes;
}

export interface ServicesBlock {
  servicesBlockTitle: string;
  servicesBlockSubtitle: string;
  servicesBlockLinkText: string;
}

export interface WhyChooseUsBlock {
  whyChooseUsBlockSubtitle: string;
  whyChooseUsBlockTitle: string;
  whyChooseUsBlockReasonOne: string;
  whyChooseUsBlockReasonTwo: string;
  whyChooseUsBlockReasonThree: string;
  whyChooseUsBlockReasonFour: string;
  whyChooseUsBlockFile: FileBlockTypes;
}

export interface StatsBlock {
  statOneValue: string;
  statOneText: string;
  statOneSymbol: string;
  statTwoValue: string;
  statTwoText: string;
  statTwoSymbol: string;
  statThreeValue: string;
  statThreeText: string;
  statThreeSymbol: string;
}

export interface WorkingProcessBlock {
  workingProcessBlockFile: FileBlockTypes;
  workingProcessBlockSubtitle: string;
  workingProcessBlockTitle: string;
  workingProcessBlockStepOneTitle: string;
  workingProcessBlockStepOneDesc: string;
  workingProcessBlockStepTwoTitle: string;
  workingProcessBlockStepTwoDesc: string;
  workingProcessBlockStepThreeTitle: string;
  workingProcessBlockStepThreeDesc: string;
}

export interface TestimonialsBlock {
  testimonialsBlockSubtitle: string;
  testimonialsBlockTitle: string;
  testimonialsBlockDesc: string;
}

export interface ServiceResidentialPage {
  serviceResidentialBannerFile: FileBlockTypes;
  serviceResidentialBannerTitle: string;
  serviceResidentialBannerSubtitle: string;
  serviceResidentialSubtitle: string;
  serviceResidentialTitle: string;
  serviceResidentialDescription: string;
  serviceResidentialFile: FileBlockTypes;
}

export interface ServiceCommercialPage {
  serviceCommercialBannerFile: FileBlockTypes;
  serviceCommercialBannerTitle: string;
  serviceCommercialBannerSubtitle: string;
  serviceCommercialSubtitle: string;
  serviceCommercialTitle: string;
  serviceCommercialDescription: string;
  serviceCommercialFile: FileBlockTypes;
  serviceCommercialBannerLogoFile: FileBlockTypes;
}

export interface ServiceBiohazardPage {
  serviceBiohazardBannerFile: FileBlockTypes;
  serviceBiohazardBannerTitle: string;
  serviceBiohazardBannerSubtitle: string;
  serviceBiohazardSubtitle: string;
  serviceBiohazardTitle: string;
  serviceBiohazardDescription: string;
  serviceBiohazardFile: FileBlockTypes;
}

export interface PhotoGalleryBlock {
  photoGalleryBlockSubtitle: string;
  photoGalleryBlockTitle: string;
  photoGalleryBlockText: string;
}

export interface FooterBlock {
  footerFile: FileBlockTypes;
  footerJingle: string;
  footerContactInfoTitle: string;
  footerAddress: string;
  footerPhoneNumber: string;
  footerEmail: string;
  footerHoursOfOperation: string;
  footerFormTitle: string;
}

export interface AboutPage {
  aboutPageFile: FileBlockTypes;
  aboutPageTitle: string;
  aboutPageSubtitle: string;
}

export interface ServicesPage {
  servicesPageFile: FileBlockTypes;
  servicesPageBannerTitle: string;
  servicesPageBannerSubtitle: string;
  servicesPageTitle: string;
  servicesPageSubtitle: string;
  servicesPageParagraph: string;
}

export interface TestimonialsPage {
  testimonialsPageFile: FileBlockTypes;
  testimonialsPageBannerTitle: string;
  testimonialsPageBannerSubtitle: string;
}
export interface PhotoGalleryPage {
  photoGalleryPageFile: FileBlockTypes;
  photoGalleryPageBannerTitle: string;
  photoGalleryPageBannerSubtitle: string;
  photoGalleryPageSubtitle: string;
  photoGalleryPageTitle: string;
  photoGalleryPageParagraph: string;
}

export interface HeaderProps {
  headerEmail: string;
  headerPhoneNumber: string;
  headerBiohazardLogoFile: FileBlockTypes;
  headerLogoFile: FileBlockTypes;
  clientLeadModalTitle: string;
  clientLeadModalSubtitle: string;
  clientLeadModalFile: FileBlockTypes;
}

export interface ContactPage {
  contactPageBannerFile: FileBlockTypes;
  contactPageBannerTitle: string;
  contactPageBannerSubtitle: string;
  contactPageTitle: string;
  contactPageSubtitle: string;
  contactPageParagraph: string;
}

export interface TeamMemberBlockProps {
  teamMemberBlockSubtitle: string;
  teamMemberBlockTitle: string;
}

export interface TextBlockMap {
  ABOUT_BLOCK: AboutBlock;
  HOME_PAGE_CLIENT_LEAD: HomePageClientLeadBlock;
  HOME_PAGE_BANNER: HomePageBannerBlock;
  SERVICES_BLOCK: ServicesBlock;
  WHY_CHOOSE_US_BLOCK: WhyChooseUsBlock;
  STATS_BLOCK: StatsBlock;
  WORKING_PROCESS_BLOCK: WorkingProcessBlock;
  TESTIMONIALS_BLOCK: TestimonialsBlock;
  SERVICE_RESIDENTIAL_PAGE: ServiceResidentialPage;
  SERVICE_COMMERCIAL_PAGE: ServiceCommercialPage;
  SERVICE_BIOHAZARD_PAGE: ServiceBiohazardPage;
  PHOTO_GALLERY_BLOCK: PhotoGalleryBlock;
  FOOTER: FooterBlock;
  ABOUT_PAGE: AboutPage;
  SERVICES_PAGE: ServicesPage;
  TESTIMONIALS_PAGE: TestimonialsPage;
  HEADER: HeaderProps;
  PHOTO_GALLERY_PAGE: PhotoGalleryPage;
  CONTACT_PAGE: ContactPage;
  TEAM_MEMBER_BLOCK: TeamMemberBlockProps;
}

export interface TextBlockStatePayload {
  textBlockMap: TextBlockMap;
  textBlockDeleted: boolean;
  success: boolean;
  loading: boolean;
  error: string | null;
  message: string | null;
  status: string;
  systemStatus: any;
  services: [];
  testimonials: [];
  photoGalleryImages: [];
  teamMembers: [];
  projects: [];
}

export const FieldBlock = { value: "", mimeType: "", fileName: "" };

export const ABOUT_BLOCK = {
  aboutBlockSubtitle: "",
  aboutBlockTitle: "",
  aboutBlockParagraph: "",
  aboutBlockServiceCategoryOne: "",
  aboutBlockServiceCategoryOneDesc: "",
  aboutBlockServiceCategoryTwo: "",
  aboutBlockServiceCategoryThree: "",
  aboutBlockServiceCategoryTwoDesc: "",
  aboutBlockServiceCategoryThreeDesc: "",
  aboutBlockFile: FieldBlock,
  aboutBlockLeafValue: "",
  aboutBlockLeafText: "",
};

export const HOME_PAGE_CLIENT_LEAD = {
  clientLeadFormTitle: "",
};

export const HOME_PAGE_BANNER = {
  homePageBannerSubtitle: "",
  homePageBannerTitle: "",
  homePageBannerFile: FieldBlock,
  homePageBannerImageFile: FieldBlock,
};

export const SERVICES_BLOCK = {
  servicesBlockTitle: "",
  servicesBlockSubtitle: "",
  servicesBlockLinkText: "",
};

export const WHY_CHOOSE_US_BLOCK = {
  whyChooseUsBlockSubtitle: "",
  whyChooseUsBlockTitle: "",
  whyChooseUsBlockReasonOne: "",
  whyChooseUsBlockReasonTwo: "",
  whyChooseUsBlockReasonThree: "",
  whyChooseUsBlockReasonFour: "",
  whyChooseUsBlockFile: FieldBlock,
};

export const STATS_BLOCK = {
  statOneValue: "",
  statOneText: "",
  statOneSymbol: "",
  statTwoValue: "",
  statTwoText: "",
  statTwoSymbol: "",
  statThreeValue: "",
  statThreeText: "",
  statThreeSymbol: "",
};

export const WORKING_PROCESS_BLOCK = {
  workingProcessBlockFile: FieldBlock,
  workingProcessBlockSubtitle: "",
  workingProcessBlockTitle: "",
  workingProcessBlockStepOneTitle: "",
  workingProcessBlockStepOneDesc: "",
  workingProcessBlockStepTwoTitle: "",
  workingProcessBlockStepTwoDesc: "",
  workingProcessBlockStepThreeTitle: "",
  workingProcessBlockStepThreeDesc: "",
};

export const TESTIMONIALS_BLOCK = {
  testimonialsBlockSubtitle: "",
  testimonialsBlockTitle: "",
  testimonialsBlockDesc: "",
};

export const SERVICE_RESIDENTIAL_PAGE = {
  serviceResidentialBannerFile: FieldBlock,
  serviceResidentialBannerTitle: "",
  serviceResidentialBannerSubtitle: "",
  serviceResidentialSubtitle: "",
  serviceResidentialTitle: "",
  serviceResidentialDescription: "",
  serviceResidentialFile: FieldBlock,
};

export const SERVICE_COMMERCIAL_PAGE = {
  serviceCommercialBannerFile: FieldBlock,
  serviceCommercialBannerTitle: "",
  serviceCommercialBannerSubtitle: "",
  serviceCommercialSubtitle: "",
  serviceCommercialTitle: "",
  serviceCommercialDescription: "",
  serviceCommercialFile: FieldBlock,
  serviceCommercialBannerLogoFile: FieldBlock,
};

export const SERVICE_BIOHAZARD_PAGE = {
  serviceBiohazardBannerFile: FieldBlock,
  serviceBiohazardBannerTitle: "",
  serviceBiohazardBannerSubtitle: "",
  serviceBiohazardSubtitle: "",
  serviceBiohazardTitle: "",
  serviceBiohazardDescription: "",
  serviceBiohazardFile: FieldBlock,
};

export const PHOTO_GALLERY_BLOCK = {
  photoGalleryBlockSubtitle: "",
  photoGalleryBlockTitle: "",
  photoGalleryBlockText: "",
};

export const FOOTER = {
  footerFile: FieldBlock,
  footerJingle: "",
  footerContactInfoTitle: "",
  footerAddress: "",
  footerPhoneNumber: "",
  footerEmail: "",
  footerHoursOfOperation: "",
  footerFormTitle: "",
};

export const ABOUT_PAGE = {
  aboutPageFile: FieldBlock,
  aboutPageTitle: "About us",
  aboutPageSubtitle: "",
};

export const PHOTO_GALLERY_PAGE = {
  photoGalleryPageFile: FieldBlock,
  photoGalleryPageBannerTitle: "",
  photoGalleryPageBannerSubtitle: "",
  photoGalleryPageSubtitle: "",
  photoGalleryPageTitle: "",
  photoGalleryPageParagraph: "",
};

export const SERVICES_PAGE = {
  servicesPageFile: FieldBlock,
  servicesPageBannerTitle: "",
  servicesPageBannerSubtitle: "",
  servicesPageTitle: "",
  servicesPageSubtitle: "",
  servicesPageParagraph: "",
};
export const TESTIMONIALS_PAGE = {
  testimonialsPageFile: FieldBlock,
  testimonialsPageBannerTitle: "",
  testimonialsPageBannerSubtitle: "",
};

export const HEADER = {
  headerEmail: "",
  headerPhoneNumber: "",
  headerBiohazardLogoFile: FieldBlock,
  headerLogoFile: FieldBlock,
  clientLeadModalTitle: "",
  clientLeadModalSubtitle: "",
  clientLeadModalFile: FieldBlock,
};

export const CONTACT_PAGE = {
  contactPageBannerFile: FieldBlock,
  contactPageBannerTitle: "Contact Us",
  contactPageBannerSubtitle: "Subtitle",
  contactPageTitle: "Get In Touch",
  contactPageSubtitle: "Contact Us",
  contactPageParagraph: "This is a paragraph",
};

export const TEAM_MEMBER_BLOCK = {
  teamMemberBlockSubtitle: "",
  teamMemberBlockTitle: "",
};

export const transformedTextBlocks: any = {
  ABOUT_BLOCK,
  HOME_PAGE_CLIENT_LEAD,
  HOME_PAGE_BANNER,
  SERVICES_BLOCK,
  WHY_CHOOSE_US_BLOCK,
  STATS_BLOCK,
  WORKING_PROCESS_BLOCK,
  TESTIMONIALS_BLOCK,
  SERVICE_RESIDENTIAL_PAGE,
  SERVICE_COMMERCIAL_PAGE,
  SERVICE_BIOHAZARD_PAGE,
  PHOTO_GALLERY_BLOCK,
  FOOTER,
  ABOUT_PAGE,
  SERVICES_PAGE,
  TESTIMONIALS_PAGE,
  HEADER,
  PHOTO_GALLERY_PAGE,
  CONTACT_PAGE,
  TEAM_MEMBER_BLOCK,
};

export const initialTextBlockState: TextBlockStatePayload = {
  textBlockMap: transformedTextBlocks,
  textBlockDeleted: false,
  success: false,
  loading: true,
  error: null,
  message: null,
  status: "",
  systemStatus: {},
  services: [],
  testimonials: [],
  photoGalleryImages: [],
  teamMembers: [],
  projects: [],
};

export const textBlockSlice = createSlice({
  name: "textBlock",
  initialState: initialTextBlockState,
  reducers: {
    setTextBlocks: (state, { payload }: any) => {
      state.loading = false;
      const combinedTextBlocks = {
        ...state.textBlockMap,
        ...payload,
      };

      state.textBlockMap = combinedTextBlocks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        textBlockApi.endpoints.updateTextBlock.matchFulfilled,
        (state) => {
          state.success = true;
          state.loading = false;
        }
      )
      .addMatcher(
        textBlockApi.endpoints.textBlockSystemStatus.matchFulfilled,
        (state, { payload }: any) => {
          state.loading = false;
          state.message = payload.message;
          state.status = payload.status;
          state.systemStatus = payload.systemStatus;
        }
      )
      .addMatcher(
        textBlockApi.endpoints.fetchHeaderAndFooterTextBlocks.matchFulfilled,
        (state, { payload }: any) => {
          state.textBlockMap = {
            ...state.textBlockMap,
            ...payload.transformedTextBlocks,
          };
        }
      )
      .addMatcher(
        textBlockApi.endpoints.fetchHomePageData.matchFulfilled,
        (state, { payload }: any) => {
          state.loading = false;
          state.textBlockMap = {
            ...state.textBlockMap,
            ...payload.transformedTextBlocks,
          };
          state.services = payload.services;
          state.testimonials = payload.testimonials;
          state.photoGalleryImages = payload.photoGalleryImages;
          state.teamMembers = payload.teamMembers;
          state.projects = payload.projects;
        }
      )
      .addMatcher(
        textBlockApi.endpoints.fetchPageSpecificTextBlocks.matchFulfilled,
        (state, { payload }: any) => {
          state.loading = false;
          state.textBlockMap = {
            ...state.textBlockMap,
            ...payload.transformedTextBlocks,
          };
        }
      )
      .addMatcher(
        (action: any) => action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload?.data || "An error occurred.";
        }
      );
  },
});

export const textBlockReducer =
  textBlockSlice.reducer as Reducer<TextBlockStatePayload>;

export const { setTextBlocks } = textBlockSlice.actions;
