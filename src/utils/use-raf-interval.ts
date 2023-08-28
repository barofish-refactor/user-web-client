import { useCallback, useEffect, useRef } from 'react';

interface RafHandle {
  id: number;
}

const setRafInterval = (callback: () => void, timeout = 0) => {
  const interval = timeout < 0 ? 0 : timeout;
  const handle: RafHandle = { id: 0 };

  let startTime = Date.now();

  const loop = () => {
    const nowTime = Date.now();
    if (nowTime - startTime >= interval) {
      startTime = nowTime;
      callback();
    }

    handle.id = requestAnimationFrame(loop);
  };

  handle.id = requestAnimationFrame(loop);

  return handle;
};

const clearRafInterval = (handle?: RafHandle | null) => {
  if (handle) cancelAnimationFrame(handle.id);
};

const useRafInterval = (fn: () => void, timeout = 0, disabled?: boolean) => {
  const timerRef = useRef<RafHandle>();

  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    if (disabled) return;
    timerRef.current = setRafInterval(() => fnRef.current(), timeout);

    return () => clearRafInterval(timerRef.current);
  }, [disabled, timeout]);

  const clear = useCallback(() => clearRafInterval(timerRef.current), []);

  return clear;
};

export default useRafInterval;
