
import Patient from "@/components/Patient.tsx";
import usePatients from "@/services/hooks/usePatients";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const  Home = () => {
  const { patients, isLoading, error } = usePatients();

  return (
    <div>
      <h2>Patients DATA :</h2>
      {isLoading ? <div className="loading-spinner"></div> : (
        <>
          <table align="center">
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => <Patient key={patient.id} item={patient} />)
                }
            </tbody>
          </table>
          <br />
          <Link to={"/addPatient"}>
            <h3>Register Patient</h3>
          </Link>
        </>
      )}
      
      {error && toast.error(error)}

    </div>
  );
}



export default Home;