import { ISpecification } from "../../types";
import useLocalStorage, {
  useStoreObjectFactory,
} from "../../lib/useLocalStorage";
import ocrALevelComputerScience from "./specs/ocrALevelComputerScience";

const useSpecification = (specificationId: string): ISpecification => {
  const { value } = useLocalStorage<ISpecification>(
    `specification-${specificationId}`,
    ocrALevelComputerScience,
    useStoreObjectFactory<ISpecification>()
  );

  return value;
};

export default useSpecification;
