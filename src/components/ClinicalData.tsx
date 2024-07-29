// type ClinicalProps = {}

import { ClinicalDataType } from "@/utils/types.ts";
import { format } from 'date-fns';

type clinicalDataProps ={
    item: ClinicalDataType;
}

const clinicalData = ({item}: clinicalDataProps) => {
    const {componentName, componentValue, measuredDateTime} = item;
    return (

            <>
                {item && (
                    <>
                                <tbody>
                                    <tr>
                                        <td>{componentName}</td>
                                        <td>{componentValue}</td>
                                        <td>{format(new Date(measuredDateTime), 'dd/MM/yyyy')}</td>
                                    </tr>
                                </tbody>

                    </>)
                }
            </>


    );
}

export default clinicalData;