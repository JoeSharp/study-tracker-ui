import { Specification } from "../types";
import useLocalStorage, { useStoreObjectFactory } from "../useLocalStorage";
import ocrALevelComputerScience from "./specs/ocrALevelComputerScience";

const useSpecification = (specificationId: string): Specification => {
  const { value } = useLocalStorage<Specification>(
    `specification-${specificationId}`, ocrALevelComputerScience,
    useStoreObjectFactory<Specification>());

  return value;
};

export default useSpecification;
