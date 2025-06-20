import { useEffect, useState } from "react";
import { Display, displayBreakpoint } from "./useFitsIn";

export const useViewportWidth = () => {
  const isClient = typeof window !== "undefined";
  const getWidth = () =>
    isClient ? window.innerWidth : displayBreakpoint[Display.DESKTOP];

  const [width, setWidth] = useState(getWidth);

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return width;
};
