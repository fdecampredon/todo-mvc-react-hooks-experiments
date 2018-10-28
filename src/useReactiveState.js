import { useState, useEffect, useMemo } from "react";

const useReactiveState = (factory, initialState) => {
  const [state, setState] = useState(initialState);
  const { events$, state$ } = useMemo(() => factory(initialState), []);
  const events = useMemo(
    () =>
      Object.keys(events$).reduce((events, key) => {
        const subject = events$[key];
        events[key] = val => {
          subject.next(val);
        };
        return events;
      }, {}),
    []
  );

  useEffect(() => {
    const subscription = state$.subscribe({
      next: val => {
        setState(val);
      }
    });
    return () => {
      return subscription.unsubscribe();
    };
  }, []);

  return [state, events];
};

export default useReactiveState;
