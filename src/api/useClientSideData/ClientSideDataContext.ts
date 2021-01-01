import React from "react";
import { ISpecificationDoc } from "../useSpecificationApi/types";
import { ClientSideData } from "./types";
import { getDefaultListReducer } from "../../lib/useListReducer/useListReducer";
import { ITrackerDoc } from "../useTrackerApi/types";

const ClientSideDataContext: React.Context<ClientSideData> = React.createContext(
  {
    specifications: getDefaultListReducer<ISpecificationDoc>(),
    trackers: getDefaultListReducer<ITrackerDoc>(),
  }
);

export default ClientSideDataContext;
