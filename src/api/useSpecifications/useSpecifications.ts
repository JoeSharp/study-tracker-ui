import { Specification } from "../../types";
import useLocalStorage, {
  useStoreObjectFactory,
} from "../../lib/useLocalStorage";
import ocrALevelComputerScience from "../useSpecification/specs/ocrALevelComputerScience";

const defaultSpecifications: Specification[] = [ocrALevelComputerScience];

export interface UseSpecifications {
  specifications: Specification[];
  defaultSpecification: Specification;
}

const useSpecifications = (): UseSpecifications => {
  const { value: specifications } = useLocalStorage(
    "specifications",
    defaultSpecifications,
    useStoreObjectFactory<Specification[]>()
  );

  return {
    specifications,
    defaultSpecification:
      specifications.length > 0 ? specifications[0] : ocrALevelComputerScience,
  };
};

export default useSpecifications;
