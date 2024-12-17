export const formatDate = (
  dateCreated: string | number | Date,
  timeZone: string = "America/New_York"
): string => {
  return new Date(dateCreated).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone,
  });
};
