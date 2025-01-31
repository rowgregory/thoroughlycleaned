import { envelopeIcon, mapMarkerIcon, phoneIcon } from "@/app/icons";
import { TextBlockMap } from "@/app/redux/features/textBlockSlice";

export const navigationDrawerData = (textBlockMap: TextBlockMap) => [
  {
    icon: mapMarkerIcon,
    h1: "Adddress",
    h2: textBlockMap?.FOOTER?.footerAddress,
    name: "footerAddress",
  },
  {
    icon: envelopeIcon,
    h1: "Email",
    h2: textBlockMap?.HEADER?.headerEmail,
    name: "headerEmail",
  },
  {
    icon: phoneIcon,
    h1: "Phone",
    h2: textBlockMap?.HEADER?.headerPhoneNumber,
    name: "headerPhoneNumber",
  },
];
