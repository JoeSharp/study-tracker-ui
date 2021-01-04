import { ISpecification } from "study-tracker-lib/dist/specificationModel";
import useLocalStorage, {
  useStoreObjectFactory,
} from "../../lib/useLocalStorage";
import * as ocrALevelComputerScience from "./specs/ocrALevelComputerScience.json";

const useSpecification = (specificationId: string): ISpecification => {
  const { value } = useLocalStorage<ISpecification>(
    `specification-${specificationId}`,
    ocrALevelComputerScience,
    useStoreObjectFactory<ISpecification>()
  );

  return value;
};

export default useSpecification;
