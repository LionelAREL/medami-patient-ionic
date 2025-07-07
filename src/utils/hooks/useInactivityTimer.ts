import { useEffect, useState } from "react";

type UseInactivityTimerOptions = {
  duration?: number;
  onExpire: () => void;
};

export const useInactivityTimer = ({
  duration = 40,
  onExpire,
}: UseInactivityTimerOptions): number => {
  const [counter, setCounter] = useState(duration);
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    setCounter(duration);
  }, [resetTrigger, duration]);

  useEffect(() => {
    if (counter === 0) {
      onExpire?.();
      return;
    }

    const timeout = setTimeout(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [counter]);

  useEffect(() => {
    const events = ["click", "keydown", "touchstart", "scroll"];

    const resetTimer = () => {
      setResetTrigger((prev) => prev + 1);
    };

    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return counter;
};
