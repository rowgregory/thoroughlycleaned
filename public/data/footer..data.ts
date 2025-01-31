import {
  clockIcon,
  envelopeIcon,
  locationDotIcon,
  phoneIcon,
} from "@/app/icons";
import { TextBlockMap } from "@/app/redux/features/textBlockSlice";

export const contactInfo = (textBlockMap: TextBlockMap) => [
  {
    icon: locationDotIcon,
    value: textBlockMap?.FOOTER?.footerAddress,
    name: "footerAddress",
  },
  {
    icon: phoneIcon,
    value: textBlockMap?.HEADER?.headerPhoneNumber,
    name: "headerPhoneNumber",
  },
  {
    icon: envelopeIcon,
    value: textBlockMap?.HEADER?.headerEmail,
    name: "headerEmail",
  },
  {
    icon: clockIcon,
    value: textBlockMap?.FOOTER?.footerHoursOfOperation,
    name: "footerHoursOfOperation",
  },
];
