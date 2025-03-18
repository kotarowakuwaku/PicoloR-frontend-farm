import { useState, useEffect, useCallback } from "react";
import type UseCountdownResult from "../types/Countdown";

const useCountdown = (onComplete: () => void): UseCountdownResult => {
  const startCountdown = useCallback((initialCount: number) => {
    setCount(initialCount);
    setIsCounting(true);
  }, []);

  const [count, setCount] = useState<number>(0);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  useEffect(() => {
    if (!isCounting || count <= 0) {
      if (count === 0 && isCounting) {
        setIsCounting(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, isCounting]);

  useEffect(() => {
    if (isCounting && count === 0) {
      setIsCounting(false);
      onComplete();
    }
  }, [count, isCounting, onComplete]);

  return { count, isCounting, startCountdown };
};
export default useCountdown;
