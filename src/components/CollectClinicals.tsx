import usePatients from "@/services/hooks/usePatients.ts";
import { PatientType } from "@/utils/types.ts";
import { format, toZonedTime } from 'date-fns-tz';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const convertToFrenchTimezoneISO = (date: Date): string => {
    const timeZone = 'Europe/Paris';
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { timeZone });
};

const CollectClinicals = () => {
    const location = useLocation();
    const { item } = location.state || {};
    const navigate = useNavigate();
    const {setPatients} =usePatients();

    const [clinicalData, setClinicalData] = useState({
        "componentName": "",
        "componentValue": "",
        "measuredDateTime": convertToFrenchTimezoneISO(new Date()),
        "patientId": item.id
    });


    useEffect(() => {
        if (location.state === null) {
            navigate('/error');
            return;
        }
    }, [location.state, navigate]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!clinicalData.componentName || !clinicalData.componentValue|| !clinicalData.measuredDateTime) {
            return;
        }
        // console.log({clinicalData});
        fetch(import.meta.env.VITE_IMPORT_API_URL + '/clinicals', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clinicalData),
        }).then(async(response) => {
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error);
            }
            return await response.json();
        })
        .then((responseJSON) => {
            // console.log({responseJSON});
            const newClinicalData = JSON.parse(JSON.stringify(responseJSON));
            // console.log({newClinicalData});
            setPatients((prev: PatientType[]) => {
                return prev.map((patient) => {
                    if (patient.id === item.id) {
                        return {
                            ...patient,
                            clinicalData: Array.isArray(patient.clinicalData) ? [...patient.clinicalData, newClinicalData] : []
                        };
                    }
                    return patient;
                });
            });
            toast.success("ClinicalData added successfully!");
            navigate('/');
        })
        .catch(() => {
            toast.error("Error in adding ClinicalData!");
        }  );

    };

    const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement >) => {
        e.preventDefault
        const { name, value } = e.target;
        setClinicalData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // console.log({name, value});
    };

    const handleChangeDate = (date: Date | null) => {
        console.log({date: date ? convertToFrenchTimezoneISO(date) : null});
        if (date) {
            setClinicalData(prevState => ({
                ...prevState,
                measuredDateTime: convertToFrenchTimezoneISO(date)
            }));
        }
    };
    return (
        <>
            {item && (
                <>
                    {/* <p>{JSON.stringify(clinicalData)}</p>
                    <br /><br /> */}
                    <div>
                        <h2>Patient Details:</h2>
                        <span>FirstName: </span><b>{item.firstName}</b>
                        <br /><br />
                        <span>LastName: </span><b>{item.lastName}</b>
                        <br /><br />
                        <span>Age: </span><b>{item.age}</b>
                        <br /><br />

                        <h2>Patient Clinical Data:</h2>
                        <form onSubmit={handleSubmit}>
                            <span>Clinical Entry Type:</span>
                            <select name="componentName" onChange={handleChange} className="componentName">
                                <option value={clinicalData.componentName}>Select One</option>
                                <option value="bp">Blood Pressure(Sys/Dys)</option>
                                <option value="hw">Height/Weight</option>
                                <option value="heartrate">Heart Rate</option>
                            </select>
                            <br /> <br />
                            Value:
                            <input
                                type="text"
                                name="componentValue"
                                className="componentValue"
                                value={clinicalData.componentValue}
                                onChange={handleChange}
                            />
                            <br /> <br />
                            <div className="datePicker">
                                <h3>Select Date</h3>
                                <DatePicker
                                    name="measuredDateTime"
                                    className="measuredDateTime"
                                    selected={clinicalData.measuredDateTime ? new Date(clinicalData.measuredDateTime) : new Date()}
                                    onChange={handleChangeDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select a date"
                                />
                                <button onClick={handleSubmit} className="buttonCollectClinicals">Confirm</button>
                            </div>
                        </form>
                        <Link to={"/"} style={{marginLeft: '155px'}}>Go Back</Link>
                    </div>
                </>
            )}
        </>

    );
}

export default CollectClinicals;