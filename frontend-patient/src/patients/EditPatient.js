import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import AddAddress from "./AddAddress";
import AddOnePatient from "./AddOnePatient";

const EditPatient = () => {

    let navigate = useNavigate();
    const {id} = useParams();

    const [patient, setPatient] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        locations: [{
            city: "",
            address: "",
            postalCode: 0
        }]
    });


    useEffect(() => {
        loadPatient().then(r => {
        });
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/patient/${id}`, patient);
        navigate("/");
    }
    const addAnotherLocation = (e) => {
        e.preventDefault();
        let editPatient = {
            ...patient, locations: [...patient.locations, {
                city: "",
                address: "",
                postalCode: 0
            }]
        }
        setPatient(editPatient)
    }

    const loadPatient = async () => {
        const result = await axios.get(`http://localhost:8080/patient/${id}`);
        setPatient(result.data);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Patient</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <AddOnePatient setPatient={setPatient} patient={patient}/>
                        <div>
                            <AddAddress setPatient={setPatient} locations={patient.locations}/>
                            <button className="btn btn-outline-info m-2" onClick={(e) => addAnotherLocation(e)}>Add
                                another location
                            </button>
                        </div>
                        <button className="btn btn-outline-primary" type="submit">Submit</button>
                        <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditPatient;