import './App.css';
import Navbar from "./layout/Navbar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddPatient from "./patients/AddPatient";
import ViewPatient from "./patients/ViewPatient";
import EditPatient from "./patients/EditPatient";
import ViewAddress from "./patients/ViewAddress";

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/addpatient" element={<AddPatient/>}></Route>
                <Route exact path="/viewaddress/:id" element={<ViewAddress/>} />
                <Route exact path="/viewpatient/:id" element={<ViewPatient/>} />
                <Route exact path="/editpatient/:id" element={<EditPatient/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;

