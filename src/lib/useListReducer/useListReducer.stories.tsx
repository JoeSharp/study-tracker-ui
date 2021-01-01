import { storiesOf } from "@storybook/react";
import React from "react";
import useListReducer from "./useListReducer";
import { ObjWithStringKey } from "./types";
import { loremIpsum } from "lorem-ipsum";
import { v4 as uuidv4 } from "uuid";

interface Thing {
  key: string;
  name: string;
}

const generateItem = (): Thing => ({
  key: uuidv4(),
  name: loremIpsum({ count: 3, units: "words" }),
});

const TEST_ITEMS: ObjWithStringKey<Thing> = Array(5)
  .fill(null)
  .map(generateItem)
  .reduce((acc, curr) => ({ ...acc, [curr.key]: curr }), {});

interface Props {
  initialItems: ObjWithStringKey<Thing>;
}

const TestHarness: React.FunctionComponent<Props> = ({ initialItems }) => {
  const { items, addItem, removeItem } = useListReducer<Thing>(
    (c) => c.key,
    initialItems
  );

  const [newName, setNewName] = React.useState<string>(uuidv4());

  const onNewNameChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewName(value),
    [setNewName]
  );

  const onAddNewItem = React.useCallback(
    (e) => {
      addItem({ key: uuidv4(), name: newName });
      e.preventDefault();
    },
    [addItem, newName]
  );

  return (
    <div>
      <form>
        <label>Name</label>
        <input value={newName} onChange={onNewNameChange} />
        <button onClick={onAddNewItem}>Add</button>
      </form>
      {Object.entries(items)
        .map((k) => ({ key: k[0], item: k[1] }))
        .map(({ key, item: { name } }) => (
          <div key={key}>
            {name}
            <button onClick={() => removeItem(key)}>Remove</button>
          </div>
        ))}
    </div>
  );
};

storiesOf("lib/useListReducer", module).add("test", () => (
  <TestHarness initialItems={TEST_ITEMS} />
));
