import React from "react";
import { getDocumentId } from "../useDocumentApi/types";
import { ISpecificationDoc } from "../useSpecificationApi/types";
import useListReducer from "../../lib/useListReducer";

import { ClientSideData } from "./types";
import ClientSideDataContext from "./ClientSideDataContext";
import { ITrackerDoc } from "../useTrackerApi/types";

const ClientSideDataProvider: React.FunctionComponent = ({ children }) => {
  const specifications = useListReducer<ISpecificationDoc>(getDocumentId, {});
  const trackers = useListReducer<ITrackerDoc>(getDocumentId, {});

  const value: ClientSideData = {
    specifications,
    trackers,
  };

  return (
    <ClientSideDataContext.Provider value={value}>
      {children}
    </ClientSideDataContext.Provider>
  );
};

export { ClientSideDataProvider };

const useClientSideData = () => React.useContext(ClientSideDataContext);

export default useClientSideData;
