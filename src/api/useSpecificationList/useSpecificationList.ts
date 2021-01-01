import { ISpecification } from "../../types";
import useLocalStorage, {
  useStoreObjectFactory,
} from "../../lib/useLocalStorage";
import ocrALevelComputerScience from "../useSpecification/specs/ocrALevelComputerScience";

// Specifications returned from listing will have components cleared out
const defaultSpecifications: ISpecification[] = [
  { ...ocrALevelComputerScience, components: [] },
];

export interface UseSpecifications {
  specifications: ISpecification[];
  defaultSpecification: ISpecification;
}

const useSpecifications = (): UseSpecifications => {
  const { value: specifications } = useLocalStorage(
    "specification-list",
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
