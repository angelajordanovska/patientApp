const AddOnePatient = ({setPatient, patient}) => {

    const {firstName, lastName, phoneNumber, dateOfBirth} = patient;
    const onInputChange = (e) => {
        setPatient({...patient, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <div className="mb-3">
                <label htmlFor="Firstname" className="form-label">First name</label>
                <input type="text" className="form-control" placeholder="Enter your first name"
                       name="firstName" value={firstName} onChange={(e) => onInputChange(e)}
                       required="required"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="Lastname" className="form-label">Last name</label>
                <input type={"text"} className="form-control" placeholder="Enter your last name"
                       name="lastName" value={lastName} onChange={(e) => onInputChange(e)}
                       required="required"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="PhoneNumber" className="form-label">Phone Number</label>
                <input type={"text"} className="form-control" placeholder="Enter your phone number"
                       name="phoneNumber" value={phoneNumber} onChange={(e) => onInputChange(e)}
                       required="required"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="Gender" className="form-label">Gender</label> <br/>
                <input type={"radio"} name="gender" value={"female"} className={"m-1"}
                       onChange={(e) => onInputChange(e)} required="required"></input>
                <label>female </label>
                <input type={"radio"} name="gender" value={"male"} className={"m-1"}
                       onChange={(e) => onInputChange(e)}></input>
                <label>male</label>
                <input type={"radio"} name="gender" value={"other"} className={"m-1"}
                       onChange={(e) => onInputChange(e)}></input>
                <label>other</label>
            </div>
            <div className="mb-3">
                <label htmlFor="Birthday" className="form-label">Date of Birth</label>
                <input type={"date"} className="form-control" placeholder="Enter your date of birth"
                       name="dateOfBirth" value={dateOfBirth} onChange={(e) => onInputChange(e)}
                       required="required"></input>
            </div>
        </div>
    )
}
export default AddOnePatient;