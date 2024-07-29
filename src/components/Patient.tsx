import { PatientType } from "@/utils/types.ts";
import { Link, LinkProps } from "react-router-dom";


type PatientProps = {
  item: PatientType;
}

type ExtendedLinkProps = LinkProps & {
  state?: PatientProps;
}

const Patient = ({ item }: PatientProps) => {
  return (
    item && (
      <>
        <tr>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.age}</td>
          <td>
            <Link to={{pathname: "/patientDetails/" + item.id}} state={{item} as ExtendedLinkProps['state']}>Add Data</Link>
          </td>
          <td>
            <Link to={{pathname: "/analyze/" +item.id}} state={{item} as ExtendedLinkProps['state']}>Analyze</Link>
          </td>
        </tr>
      </>
    )
  );
}

export default Patient;