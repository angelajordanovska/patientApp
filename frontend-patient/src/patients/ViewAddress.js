import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

const ViewAddress = () => {

    const [address, setAddress] = useState({
        locations: [{
            city: "",
            address: "",
            postalCode: 0,
        }]
    })
    const {id} = useParams();

    useEffect(() => {
        loadAddress().then(r => {
        });
    }, [])

    const loadAddress = async () => {
        const result = await axios.get(`http://localhost:8080/patient/${id}`);
        setAddress(result.data);
    }

    return (
        <div>
            <h2 className="text-center m-4">Address</h2>
            <div className="card">
                <div className="card-header">

                    {
                        address.locations.map((location, index) => (
                            <ul className="list-group list-group-flush p-3" key={index}>
                                <h4>Address number: {index + 1}</h4>
                                <li className="list-group-item">
                                    <b>City: </b>
                                    {location.city}
                                </li>
                                <li className="list-group-item">
                                    <b>Address: </b>
                                    {location.address}
                                </li>
                                <li className="list-group-item">
                                    <b>Postal Code: </b>
                                    {location.postalCode}
                                </li>
                            </ul>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}
export default ViewAddress;