import React from "react";

type Callback = () => void;

interface Props {
  callback: Callback;
  delay: number | null;
}

const useInterval = ({ callback, delay }: Props) => {
  const savedCallback = React.useRef<Callback>();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      if (!!savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
