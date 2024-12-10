type NavigationLinkData = {
  linkText: string;
  linkKey: string;
  active: boolean;
};

const navigationLinkData = (path: string): NavigationLinkData[] => {
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
    {
      linkText: "Login",
      linkKey: "/auth/login",
      active: path === "/auth/login",
    },
  ];
};

export default navigationLinkData;
