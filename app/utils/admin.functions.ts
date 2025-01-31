export const getEndpointStatus = (data: any, key: string) => {
  if (!data) {
    return {
      status: "outage",
      message: `${key} encountered an error.`,
    };
  }

  return { status: "operational", message: `${key} is healthy.` };
};

export const extractSentenceWithArgument = (errorMessage: any) => {
  const index = errorMessage.indexOf("Unknown");
  if (index !== -1) {
    return errorMessage.slice(index).trim(); // Extract from "Argument" to the end
  }
  return null; // Return null if no sentence contains "Argument"
};
