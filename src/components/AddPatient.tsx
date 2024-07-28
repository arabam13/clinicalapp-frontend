import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AddPatient = () => {
    const [patientData, setPatientData] = useState({
        firstName: "",
        lastName: "",
        age: ""
    });
    const firstNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (firstNameRef.current) {
            firstNameRef.current.focus();
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault
        const { name, value } = e.target;
        setPatientData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!patientData.firstName || !patientData.lastName || !patientData.age) {
            return;
        }
        // console.log(patientData);
        fetch(import.meta.env.VITE_IMPORT_API_URL +'/patients', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patientData),
        }).then(() => {
            toast.success("Patient added successfully!");
        });
        setPatientData({
            firstName: "",
            lastName: "",
            age: ""
        })
        if (firstNameRef.current) {
            firstNameRef.current.focus();
        }

    }

    return (
        <div className="container">
            <h2>Create Patient:</h2>
            <form
                className="AddPatientForm"
                onSubmit={handleSubmit}
            >
                <div className="fieldname">
                    <p className="label">First Name:</p>
                    <input
                        type="text"
                        name="firstName"
                        value={patientData.firstName}
                        onChange={handleChange}
                        ref={firstNameRef}
                    />
                </div>
                <div className="fieldname">
                    <p className="label">Last Name:</p>
                    <input
                        type="text"
                        name="lastName"
                        value={patientData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="fieldname">
                    <p className="label">Age:</p>
                    <input
                        type="number"
                        name="age"
                        value={patientData.age}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Confirm</button>
            </form>
            <Link to={"/"}>Go Back</Link>
        </div>
    );
}

export default AddPatient;