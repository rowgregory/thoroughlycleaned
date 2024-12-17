const shouldExcludePath = (pathname: string) => {
  const urlsToExclude = ["/admin", "/auth/login", "/auth/register"];

  const matchingUrls = urlsToExclude.filter((url) => pathname.includes(url));

  if (matchingUrls.length > 0) {
    return true;
  }

  return false;
};

export default shouldExcludePath;
