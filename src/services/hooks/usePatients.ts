import { PatientsContext } from "@/services/PatientsContextProvider.tsx";
import { useContext } from "react";

const usePatients = () => {
  const patientsContext = useContext(PatientsContext);

  if (!patientsContext) {
    throw new Error(
      "usePatients must be used within a PatientsContextProvider"
    );
  }

  return patientsContext;
};

export default usePatients;
