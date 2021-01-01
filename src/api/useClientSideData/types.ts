import { ISpecificationDoc } from "../useSpecificationApi/types";
import { ITrackerDoc } from "../useTrackerApi/types";
import { UseListReducer } from "../../lib/useListReducer/types";

export interface ClientSideData {
  specifications: UseListReducer<ISpecificationDoc>;
  trackers: UseListReducer<ITrackerDoc>;
}
