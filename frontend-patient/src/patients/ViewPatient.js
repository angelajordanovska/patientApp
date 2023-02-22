import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import ViewAddress from "./ViewAddress";

const ViewPatient = () => {
    const [patient, setPatient] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: ""
    })
    const {id} = useParams();

    useEffect(() => {
        loadPatient().then(r => {
        });
    }, [])

    const loadPatient = async () => {
        const result = await axios.get(`http://localhost:8080/patient/${id}`);
        setPatient(result.data);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Patient Details</h2>
                    <div className="card">
                        <div className="card-header"> Details of patient with id: {patient.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>First name: </b>
                                    {patient.firstName}
                                </li>
                                <li className="list-group-item">
                                    <b>Last name: </b>
                                    {patient.lastName}
                                </li>
                                <li className="list-group-item">
                                    <b>Phone number: </b>
                                    {patient.phoneNumber}
                                </li>
                                <li className="list-group-item">
                                    <b>Gender: </b>
                                    {patient.gender}
                                </li>
                                <li className="list-group-item">
                                    <b>Birthday: </b>
                                    {patient.dateOfBirth}
                                </li>
                            </ul>
                            <ViewAddress/>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to="/">Back to home</Link>
                </div>
            </div>
        </div>
    )
}
export default ViewPatient;