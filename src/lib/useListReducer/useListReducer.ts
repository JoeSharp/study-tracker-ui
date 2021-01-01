import React from "react";

import { UseListReducer, ObjWithStringKey } from "./types";

/**
 * This file exports a custom hook that can be used to manage a object
 * with a reducer. It handles a few simple use cases for reducer based objects
 * that were common to a number of components.
 */

interface KeyedReceivedAction<T> {
  type: "keyedItemstemsReceived";
  items: ObjWithStringKey<T>;
}
interface ListReceivedAction<T> {
  type: "listOfItemsReceived";
  items: T[];
}
interface AddAction<T> {
  type: "itemAdded";
  item: T;
}
interface RemovedAction {
  type: "itemRemoved";
  itemKey: string;
}

export const getDefaultListReducer = <T extends {}>(): UseListReducer<T> => {
  return {
    addItem: (item: T) => console.log("no", item),
    items: {},
    itemsInList: [] as T[],
    receiveListOfItems: (items: T[]) =>
      console.log("Default Implementation", items),
    removeItem: (itemKey: string) =>
      console.log("Default Implementation", itemKey),
  };
};

const createObjectReducer = <T extends {}>(getKey: (item: T) => string) => {
  return (
    state: ObjWithStringKey<T>,
    action:
      | KeyedReceivedAction<T>
      | ListReceivedAction<T>
      | AddAction<T>
      | RemovedAction
  ): ObjWithStringKey<T> => {
    switch (action.type) {
      case "keyedItemstemsReceived":
        return action.items;
      case "listOfItemsReceived":
        return action.items.reduce(
          (acc, curr) => ({ ...acc, [getKey(curr)]: curr }),
          {}
        );
      case "itemAdded":
        return {
          ...state,
          [getKey(action.item)]: action.item,
        };
      case "itemRemoved":
        const newState: ObjWithStringKey<T> = { ...state };
        delete newState[action.itemKey];
        return newState;
      default:
        return state;
    }
  };
};

const useListReducer = <T extends {}>(
  getKey: (item: T) => string,
  initialItems: ObjWithStringKey<T> = {}
): UseListReducer<T> => {
  const [items, dispatch] = React.useReducer(
    createObjectReducer<T>(getKey),
    initialItems
  );

  return {
    items,
    itemsInList: React.useMemo(() => Object.values(items), [items]),
    receiveListOfItems: React.useCallback(
      (items: T[]) =>
        dispatch({
          type: "listOfItemsReceived",
          items,
        }),
      [dispatch]
    ),
    addItem: React.useCallback(
      (item: T) =>
        dispatch({
          type: "itemAdded",
          item,
        }),
      [dispatch]
    ),
    removeItem: React.useCallback(
      (itemKey: string) =>
        dispatch({
          type: "itemRemoved",
          itemKey,
        }),
      [dispatch]
    ),
  };
};

export default useListReducer;
