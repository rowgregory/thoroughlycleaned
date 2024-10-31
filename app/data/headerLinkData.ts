const headerLinkData = (path: string, t: any) => {
  return [
    {
      linkText: t("header.bottomSection.link1"),
      linkKey: "/",
      active: path === "/",
    },
    {
      linkText: t("header.bottomSection.link2"),
      linkKey: "/about",
      active: path === "/about",
    },
    {
      linkText: t("header.bottomSection.link3"),
      linkKey: "/services",
      active: path === "/services",
    },
    {
      linkText: t("header.bottomSection.link4"),
      linkKey: "/testimonials",
      active: path === "/testimonials",
    },
  ];
};

export default headerLinkData;
