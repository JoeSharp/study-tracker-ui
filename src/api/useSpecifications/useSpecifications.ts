import { ISpecification } from "../../types";
import useLocalStorage, {
  useStoreObjectFactory,
} from "../../lib/useLocalStorage";
import ocrALevelComputerScience from "../useSpecification/specs/ocrALevelComputerScience";

const defaultSpecifications: ISpecification[] = [ocrALevelComputerScience];

export interface UseSpecifications {
  specifications: ISpecification[];
  defaultSpecification: ISpecification;
}

const useSpecifications = (): UseSpecifications => {
  const { value: specifications } = useLocalStorage(
    "specifications",
    defaultSpecifications,
    useStoreObjectFactory<ISpecification[]>()
  );

  return {
    specifications,
    defaultSpecification:
      specifications.length > 0 ? specifications[0] : ocrALevelComputerScience,
  };
};

export default useSpecifications;
