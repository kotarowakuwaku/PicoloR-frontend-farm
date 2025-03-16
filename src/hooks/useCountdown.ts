import { useState, useEffect } from 'react';

const useCountdown = (initialCount: number, isActive: boolean): number => {
  const [count, setCount] = useState<number>(initialCount);

 //カウントのリセット
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  // isActive が true の場合にカウントダウンを実施
  useEffect(() => {
    if (!isActive) return;
    if (count <= 0) return;

    const timer = setTimeout(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, isActive]);

  return count;
};

export default useCountdown;
