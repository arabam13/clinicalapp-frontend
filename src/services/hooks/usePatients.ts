import { PatientsContext } from "@/services/PatientsContextProvider.tsx";
import { useContext } from "react";

const useProperties = () => {
  const patientsContext = useContext(PatientsContext);

  if (!patientsContext) {
    throw new Error(
      "usePatients must be used within a PatientsContextProvider"
    );
  }

  return patientsContext;
};

export default useProperties;
