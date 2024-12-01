"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [pathname]);
};

export default useAnalytics;
