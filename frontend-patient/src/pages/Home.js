import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import "../modal-style.css";
import ViewPatient from "../patients/ViewPatient";

const Home = () => {

    const [patients, setPatients] = useState([]);
    const [patientToBeDeleted, setPatientToBeDeleted] = useState([]);
    let modal = document.getElementById("myModal");

    useEffect(() => {
        loadPatients().then(r => {
        });
    }, [])

    const {id} = useParams();


    const loadPatients = async () => {
        const result = await axios.get("http://localhost:8080/patient/");
        setPatients(result.data);
    }

    const deletePatient = async () => {
        await axios.delete(`http://localhost:8080/patient/${patientToBeDeleted.id}`);
        loadPatients().then(r => {
        });
        modal.style.display = "none";
    }

    const showModal = () => {
        modal.style.display = "block";
    }
    const closeModal = () => {
        modal.style.display = "none";
    }

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">S.N</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Date of birth</th>
                        <th scope="col">Address:</th>
                        <th scope="col">Actions</th>
                    </tr>
                    {
                        patients.map((patient, index) => (
                            <tr key={patient.id}>
                                <th scope="col">{index + 1}</th>
                                <th scope="col">{patient.firstName}</th>
                                <th scope="col">{patient.lastName}</th>
                                <th scope="col">{patient.phoneNumber}</th>
                                <th scope="col">{patient.gender}</th>
                                <th scope="col">{patient.dateOfBirth}</th>
                                <th scope="col"><Link className="btn btn-primary mx-2"
                                                      to={`/viewaddress/${patient.id}`}>View Address</Link></th>
                                <th scope="col">
                                    <Link className="btn btn-primary mx-2" to={`/viewpatient/${patient.id}`}>View</Link>
                                    <Link className="btn btn-outline-primary mx-2"
                                          to={`/editpatient/${patient.id}`}>Edit</Link>
                                    <button className="btn btn-danger mx-2" onClick={() => {
                                        showModal();
                                        setPatientToBeDeleted(patient)
                                    }}>Delete
                                    </button>
                                    <div id="myModal" className="modal">
                                        <div className="modal-content">
                                            <p>Are you sure you want to delete patient with
                                                id: {patientToBeDeleted.id}?</p>
                                            {"First name: " + patientToBeDeleted.firstName + ", Last name: " + patientToBeDeleted.lastName + ", Birthday: " + patientToBeDeleted.dateOfBirth + ", Gender: " + patientToBeDeleted.gender}
                                            <button className="btn btn-outline-success m-2 "
                                                    onClick={closeModal}>Cancel
                                            </button>
                                            <button className="btn btn-danger m-2 "
                                                    onClick={() => deletePatient()}>Delete Patient
                                            </button>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        ))
                    }
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Home;
