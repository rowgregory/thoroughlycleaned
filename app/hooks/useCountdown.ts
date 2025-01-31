import { useState, useEffect } from "react";

function useCountdown(expiresAt: Date | string) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Ensure expiresAt is a valid Date object
    const expiryDate = new Date(expiresAt);

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const distance = expiryDate.getTime() - currentTime;

      if (distance <= 0) {
        clearInterval(interval);
        setIsActive(false);
      } else {
        setTimeRemaining(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  return { minutes, seconds, isActive, setIsActive, timeRemaining };
}

export default useCountdown;
