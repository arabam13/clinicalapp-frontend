import type { PatientType } from "@/utils/types.ts";
import { Link } from "react-router-dom";

type PatientProps = {
        item: PatientType;
}

const Patient = ({item: {id, firstName, lastName, age}}: PatientProps) => {
        return (
          <tr>
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
              <Link to={"/patientDetails/" + id}>Add Data</Link>
            </td>
            <td>
              <Link to={"/analyze/" + id}>Analyze</Link>
            </td>
          </tr>
        );
}

export default Patient;