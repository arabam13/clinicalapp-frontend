export type PatientsContextType = {
  patients: PatientType[];
  isLoading: boolean;
  error: string | null;
};

export type PatientType = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};
