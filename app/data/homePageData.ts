import { TFunction } from "i18next";

const aboutSectionPickerData = (t: TFunction) => [
  {
    section: t("home.about.subtitles.one"),
    textKey: "provide",
  },
  {
    section: t("home.about.subtitles.two"),
    textKey: "works",
  },
  {
    section: t("home.about.subtitles.three"),
    textKey: "us",
  },
];

const weProvideData = (t: TFunction) => [
  t("home.about.provide.points.one"),
  t("home.about.provide.points.two"),
  t("home.about.provide.points.three"),
  t("home.about.provide.points.four"),
  t("home.about.provide.points.five"),
  t("home.about.provide.points.six"),
];

const howItWorksData = (t: TFunction) => [
  {
    title: t("home.about.works.titleOne"),
    text: t("home.about.works.textOne"),
  },
  {
    title: t("home.about.works.titleTwo"),
    text: t("home.about.works.textTwo"),
  },
  {
    title: t("home.about.works.titleThree"),
    text: t("home.about.works.textThree"),
  },
];

const reasonsToChooseUsData = (t: TFunction) => [
  {
    title: t("home.reasonsToChooseUs.topRatedCompany.title"),
    text: t("home.reasonsToChooseUs.topRatedCompany.description"),
  },
  {
    title: t("home.reasonsToChooseUs.superiorQuality.title"),
    text: t("home.reasonsToChooseUs.superiorQuality.description"),
  },
  {
    title: t("home.reasonsToChooseUs.ecoFriendlyProducts.title"),
    text: t("home.reasonsToChooseUs.ecoFriendlyProducts.description"),
  },
];

const cleaningIndustryNewsData = (first: any, second: any, third: any) => [
  {
    image: first.image,
    title: first.title,
    date: first.date,
    description: first.description,
    externalUrl: first.externalUrl,
    externalUrlText: first.externalUrlText,
  },
  {
    image: second.image,
    title: second.title,
    date: second.date,
    description: second.description,
    externalUrl: second.externalUrl,
    externalUrlText: second.externalUrlText,
  },
  {
    image: third.image,
    title: third.title,
    date: third.date,
    description: third.description,
    externalUrl: third.externalUrl,
    externalUrlText: third.externalUrlText,
  },
];

export {
  aboutSectionPickerData,
  weProvideData,
  reasonsToChooseUsData,
  howItWorksData,
  cleaningIndustryNewsData,
};
