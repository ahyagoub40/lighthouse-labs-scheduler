import { useState } from "react";

export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  const transition = (nextMode, replace = false) => {
    if (replace) {
      history.pop();
      setMode(nextMode);
    } else {
      // setHistory(history.concat(nextMode));
      setHistory(mode => ([...mode, nextMode]))
      setMode(nextMode);
    }
  };
  const back = () => {
    if (history.length > 1) {
      history.pop();
    }
    const prevMode = history[history.length - 1];
    setMode(prevMode);
  };
  return {mode, transition, back};
}