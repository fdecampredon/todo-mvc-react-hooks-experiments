import { useState, useCallback } from "react";

const useReturningState = (initialState, actions) => {
  const [state, setState] = useState(initialState);

  const wrappedActions = Object.keys(actions).reduce((wrappedActions, key) => {
    const action = actions[key];
    wrappedActions[key] = useCallback((...args) => {
      setState(action(...args, state));
    }, state);
    return wrappedActions;
  }, {});

  return [state, wrappedActions];
};

export default useReturningState;
