const AddAddress = ({setPatient, locations}) => {

    const onLocationInputChange = (e, index) => {
        setPatient((prevPatient) => {
            let editLocations = [...locations];
            editLocations[index] = {...editLocations[index], [e.target.name]: e.target.value}
            return {...prevPatient, locations: editLocations}
        });
    }

    const removeAddress = (e, index) => {
        setPatient((prevPatient) => {
            e.preventDefault();
            let list = [...locations];
            list.splice(index, 1);
            return {...prevPatient, locations: list}
        })

    }


    return (
        <div>
            {locations?.map((location, index) => (
                <div key={index}>
                    <h5>Location: </h5>
                    <div className="mb-3">
                        <label htmlFor="City" className="form-label">City</label>
                        <input type={"text"} className="form-control" placeholder="Enter city" name="city"
                               value={location.city}
                               onChange={(e) => onLocationInputChange(e, index)}
                               required="required">
                        </input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Address" className="form-label">Address</label>
                        <input type={"text"} className="form-control" placeholder="Enter Address" name="address"
                               value={location.address} onChange={(e) => onLocationInputChange(e, index)}
                               required="required"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Postcode" className="form-label">Postal code:</label>
                        <input type={"number"} className="form-control" placeholder="Enter your postal code"
                               name="postalCode"
                               value={location.postalCode} onChange={(e) => onLocationInputChange(e, index)}
                               required="required"></input>
                    </div>
                    {locations.length > 1 && (
                        <button className="btn btn-outline-warning m-2" onClick={(e) => removeAddress(e, index)}>Remove
                            address</button>
                    )}
                </div>
            ))}

        </div>
    )
}
export default AddAddress;