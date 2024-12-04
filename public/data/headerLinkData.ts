const headerLinkData = (path: string) => {
  return [
    {
      linkText: "Home",
      linkKey: "/",
      active: path === "/",
    },
    {
      linkText: "About",
      linkKey: "/about",
      active: path === "/about",
    },
    {
      linkText: "Services",
      linkKey: "/services",
      active: path === "/services",
    },
    {
      linkText: "Projects",
      linkKey: "/projects",
      active: path === "/projects",
    },
    {
      linkText: "Testimonials",
      linkKey: "/testimonials",
      active: path === "/testimonials",
    },
  ];
};

export default headerLinkData;
