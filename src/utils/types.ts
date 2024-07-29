export type PatientsContextType = {
  patients: PatientType[];
  setPatients: React.Dispatch<React.SetStateAction<PatientType[]>>;
  isLoading: boolean;
  error: string | null;
};

export type PatientType = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  clinicalData: ClinicalDataType[];
};

export type ClinicalDataType = {
  id: number;
  componentName: string;
  componentValue: string;
  measuredDateTime: Date;
  patient: Omit<PatientType, "clinicalData">;
};
