import React from "react";
import { storiesOf } from "@storybook/react";

import useInterval from "./useInterval";
import useCounter from "../useCounter";
import JsonDebug from "../JsonDebug";
import useToggle from "../useToggle";

const CounterTest: React.FunctionComponent = () => {
  const { value: count, increment } = useCounter();
  const { toggle: toggleEnabled, value: enabled } = useToggle();
  const [delay, setDelay] = React.useState<number>(500);

  useInterval({ callback: increment, delay: enabled ? delay : null });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setDelay(parseInt(value)),
    [setDelay]
  );

  return (
    <div>
      <div className="form-group">
        <label>Enabled</label>
        <input
          className="form-control"
          type="checkbox"
          checked={enabled}
          onChange={toggleEnabled}
        />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          className="form-control"
          type="number"
          value={delay}
          onChange={onChange}
        />
      </div>
      <JsonDebug value={{ count }} />
    </div>
  );
};

storiesOf("lib/useInterval", module).add("counter", () => <CounterTest />);
