interface ApiError {
  [key: string]: string[] | ApiError;
}

type ExtractedErrors = Record<string, string>;

function extractNestedErrorMessages(
  errorResponse: ApiError,
  parentKey = "",
): ExtractedErrors {
  const extractedErrors: ExtractedErrors = {};

  for (const [field, messages] of Object.entries(errorResponse)) {
    const key = parentKey ? `${parentKey}.${field}` : field;

    if (Array.isArray(messages)) {
      extractedErrors[key] = messages[0];
    } else if (typeof messages === "object" && messages !== null) {
      Object.assign(extractedErrors, extractNestedErrorMessages(messages, key));
    }
  }

  return extractedErrors;
}

export { extractNestedErrorMessages };
