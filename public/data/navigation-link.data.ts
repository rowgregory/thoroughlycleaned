import {
  calculatorIcon,
  cameraIcon,
  commentsIcon,
  dashboardIcon,
  toolsIcon,
} from "@/app/icons";

type NavigationLinkData = {
  linkText: string;
  linkKey: string;
  active: boolean;
};

export const headerNavigationLinkData = (
  path: string,
  isLoggedIn: boolean
): NavigationLinkData[] => {
  const links: NavigationLinkData[] = [
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

  if (isLoggedIn) {
    links.push({
      linkText: "Dashboard",
      linkKey: "/admin/dashboard",
      active: path === "/admin/dashboard",
    });
  } else {
    links.push({
      linkText: "Login",
      linkKey: "/auth/login",
      active: path === "/auth/login",
    });
  }

  return links;
};

export const dashboardNavigationLinkData = [
  {
    textKey: "Dashboard",
    linkKey: "/admin/dashboard",
    icon: dashboardIcon,
  },
  {
    textKey: "Services",
    linkKey: "/admin/services",
    icon: toolsIcon,
  },
  {
    textKey: "Testimonials",
    linkKey: "/admin/testimonials",
    icon: commentsIcon,
  },
  {
    textKey: "Price Estimates",
    linkKey: "/admin/price-estimates",
    icon: calculatorIcon,
  },
  {
    textKey: "Photos",
    linkKey: "/admin/photos",
    icon: cameraIcon,
  },
];
