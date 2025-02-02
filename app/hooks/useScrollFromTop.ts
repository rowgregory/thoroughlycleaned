import { useState, useEffect, useRef } from "react";

const useScrollFromTop = (threshold = 100) => {
  const [showHeader, setShowHeader] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < threshold) {
        setShowHeader(false); // Hide header when near the top
      } else if (currentScrollY < lastScrollY.current) {
        setShowHeader(true); // Show when scrolling up
      } else {
        setShowHeader(false); // Hide when scrolling down
      }

      lastScrollY.current = currentScrollY; // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return showHeader;
};

export default useScrollFromTop;
