import { envelopeIcon, homeIcon, userIcon } from "@/app/icons";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

interface AdminSideNavLinkProps {
  textKey: string;
  linkKey: string;
  active: boolean;
  icon: IconDefinition;
}

const adminNavLinkData = (path: string): AdminSideNavLinkProps[] => [
  {
    textKey: "Home",
    linkKey: "/",
    active: path === "/",
    icon: homeIcon,
  },
  {
    textKey: "Services",
    linkKey: "/services",
    active: path === "/services",
    icon: userIcon,
  },
  {
    textKey: "Contact",
    linkKey: "/contact",
    active: path === "/contact",
    icon: envelopeIcon,
  },
];

export default adminNavLinkData;
