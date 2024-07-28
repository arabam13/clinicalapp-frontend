// import propTypes from 'prop-types';
import { PatientsContextType, PatientType } from '@/utils/types';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export const PatientsContext = createContext<PatientsContextType | null>(
  null
);

export const PatientsContextProvider = ({ children }: PropsWithChildren) => {
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const retrievePatients = async () => {
    setIsLoading(true);
    setError(null);
    setPatients([]);

    setTimeout(async () => {
      // await fetch('http://localhost:8080/api/patients')
      await fetch(import.meta.env.VITE_IMPORT_API_URL +'/patients')
        .then((data) => data.json())
        .then((results) => {
          setError(null);
          setPatients(results);
        })
        .catch((err) => {
          setPatients([]);
          if (
            err instanceof Error &&
            typeof err === 'object' &&
            'message' in err
          ) {
            setError(err.message);
          } else if (typeof err === 'string') {
            setError(err);
          } else {
            setError('Something went wrong!');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  };

  useEffect(() => {
    retrievePatients();
  }, []);

  return (
    <PatientsContext.Provider
      value={{
        patients,
        isLoading,
        error,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

