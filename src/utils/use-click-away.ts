import { useCallback, useEffect, useRef, type RefObject } from 'react';

type EventTypeMap = HTMLElementEventMap;

export default function useClickAway<T extends keyof EventTypeMap>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: EventTypeMap[T]) => void,
  events: T[] = ['click'] as T[],
) {
  const savedCallback = useRef(onClickAway);

  const handler = useCallback(
    (event: EventTypeMap[T]) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        savedCallback.current(event);
      }
    },
    [ref],
  );

  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    events.forEach(eventName => document.addEventListener(eventName, handler));
    return () => {
      events.forEach(eventName => document.removeEventListener(eventName, handler));
    };
  }, [events, handler]);
}
