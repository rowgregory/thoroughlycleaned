import { useEffect, useRef, useState } from "react";

const useVideo = () => {
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleLoad = () => setLoading(false)

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("loadeddata", handleLoad);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadeddata", handleLoad);
      }
    };
  }, []);

  return { loading, videoRef };
};

export default useVideo;
