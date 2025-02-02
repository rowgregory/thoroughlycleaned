import { isStringInPath } from "@/app/utils/string.functions";

interface SubLink {
  linkKey: string;
  linkText: string;
  active: boolean;
}

type NavigationLinkData = {
  linkText: string;
  linkKey: string;
  active: boolean;
  showIcon?: boolean;
  subLinks?: SubLink[];
  show?: boolean;
};

export const headerNavigationLinkData = (
  path: string,
  isAuthenticated: boolean | null
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
      active: [
        "/services",
        "/services/residential",
        "/services/commercial",
        "/services/biohazard",
      ].includes(path),
      showIcon: true,
      subLinks: [
        {
          linkText: "All Services",
          linkKey: "/services",
          active: path === "/services",
        },
        {
          linkText: "Residential",
          linkKey: "/services/residential",
          active: path === "/services/residential",
        },
        {
          linkText: "Commercial",
          linkKey: "/services/commercial",
          active: path === "/services/commercial",
        },
        {
          linkText: "Biohazard",
          linkKey: "/services/biohazard",
          active: path === "/services/biohazard",
        },
      ],
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
      linkText: "Contact",
      linkKey: "/contact",
      active: path === "/contact",
    },
  ];

  if (isAuthenticated) {
    links.push({
      linkText: "Dashboard",
      linkKey: "/admin/services",
      active: path === "/admin/services",
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

export const adminNavigationLinkData = (path: string, role: string | null) => {
  const links = [
    {
      textKey: "Services",
      linkKey: "/admin/services",
      active: isStringInPath(path, "services"),
    },
    {
      textKey: "Testimonials",
      linkKey: "/admin/testimonials",
      active: isStringInPath(path, "testimonials"),
    },
    {
      textKey: "Client Leads",
      linkKey: "/admin/client-leads",
      active: isStringInPath(path, "client-leads"),
    },
    {
      textKey: "Photo Gallery",
      linkKey: "/admin/photo-gallery",
      active: path === "/admin/photo-gallery",
    },
    {
      textKey: "Team Members",
      linkKey: "/admin/team-members",
      active: path === "/admin/team-members",
    },
    {
      textKey: "Approved Users",
      linkKey: "/admin/approved-users",
      active: path === "/admin/approved-users",
    },
    {
      textKey: "Linked Users",
      linkKey: "/admin/linked-users",
      active: path === "/admin/linked-users",
    },
    {
      textKey: "Profile",
      linkKey: "/admin/profile",
      active: path === "/admin/profile",
    },
  ];

  if (role === "super-user") {
    links.push(
      {
        textKey: "System Status",
        linkKey: "/admin/system-status",
        active: path === "/admin/system-status",
      },
      {
        textKey: "Logs",
        linkKey: "/admin/logs",
        active: path === "/admin/logs",
      }
    );
  }

  return links;
};
