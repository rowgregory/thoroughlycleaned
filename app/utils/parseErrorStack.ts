import ErrorStackParser from "error-stack-parser";

const parseStack = (stackFrames: any) => {
  let result = {
    errorLocation: "",
  };

  let firstRelevantStackFrame: any = null;

  stackFrames.forEach((stackFrame: any) => {
    // Ignore node_modules and find the first relevant stack frame
    if (stackFrame.fileName && !stackFrame.fileName.includes("node_modules")) {
      if (!firstRelevantStackFrame) {
        firstRelevantStackFrame = stackFrame;
      }
    }
  });

  // If there's a relevant stack frame, extract location details
  if (firstRelevantStackFrame) {
    result.errorLocation = `Function: ${
      firstRelevantStackFrame.functionName || "Unknown"
    }, File: ${firstRelevantStackFrame.fileName}, Line: ${
      firstRelevantStackFrame.lineNumber
    }`;
  } else {
    result.errorLocation = "No relevant location found.";
  }

  return result;
};

const parseErrorStack = (error: any) => {
  const stackFrames = ErrorStackParser.parse(error);

  // Use the parseStack function to extract relevant details
  const parsedStack = parseStack(stackFrames);
  return parsedStack.errorLocation;
};

export default parseErrorStack;
