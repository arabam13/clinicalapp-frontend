import { ClinicalDataType } from "@/utils/types.ts";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClinicalData from "./ClinicalData";

const AnalyzeData = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const navigate = useNavigate();
  // console.log({location});

  useEffect(() => {
    if (location.state === null) {
        navigate('/error');
        return;
    }
}, [location.state, navigate]);

  return (
    <div>
        <h2>Patient Details:</h2>
        {item && (
          <>
            <span>First Name:</span> <b>{item.firstName}</b>
            <br /><br />
            <span>Last Name:</span> <b>{item.lastName}</b>
            <br /><br />
            <span style={{marginRight: '48px'}}>Age:</span> <b>{item.age}</b>
            <h2>Clinical Report:</h2>
            <div style={{marginBottom: '30px'}}>
              <table align="center">
                  <thead>
                      <tr>
                          <th>Component Name</th>
                          <th>Component Value</th>
                          <th>Measured Date Time</th>
                      </tr>
                  </thead>
                  {item.clinicalData.map((eachEntry: ClinicalDataType) => <ClinicalData item={eachEntry} key={eachEntry.id}/>)}
                </table>
              </div>
            <Link to={"/"}>Go Back</Link>
          </>
        )}
    </div>
  );
}

export default AnalyzeData;