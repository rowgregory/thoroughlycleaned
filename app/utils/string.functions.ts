export const isStringInPath = (path: string, searchString: string) => {
  return path.includes(searchString);
};

export const shouldExcludePath = (pathname: string) => {
  const validPaths = [
    "/",
    "/about",
    "/services",
    "/services/commercial",
    "/services/residential",
    "/services/biohazard",
    "/projects",
    "/testimonials",
  ];

  const isValidPath = validPaths.some((path) => pathname === path);

  // If the current pathname is invalid (not in the valid paths), exclude header and footer
  return !isValidPath;
};

export const generate2FA = () => {
  const numbers = "0123456789";
  let rand4DigitCode = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    rand4DigitCode += numbers.charAt(randomIndex);
  }
  return rand4DigitCode;
};

export const formatPhoneNumber = (phone: string) => {
  if (!phone) return;
  // Remove all non-numeric characters
  const digits = phone?.replace(/\D/g, "");

  // Format the phone number
  const formatted = `(${digits?.slice(0, 3)}) ${digits?.slice(
    3,
    6
  )} ${digits?.slice(6)}`;
  return formatted;
};

export const truncatedServiceDescription = (
  description: string,
  sliceAmount?: number
) => {
  const words = description?.split(" ");
  const isTruncated = words?.length > 10;
  const displayedText =
    words?.slice?.(0, sliceAmount || 20)?.join?.(" ") +
    (isTruncated ? "..." : "");
  return displayedText;
};

export function truncateString(str: string, slice: number) {
  if (str.length > slice) {
    return str.slice(0, slice) + "...";
  }
  return str;
}
