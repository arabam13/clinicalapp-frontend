import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import AddPatient from "./components/AddPatient";
import AnalyzeData from "./components/AnalyzeData";
import CollectClinicals from "./components/CollectClinicals";
import Error from "./components/Error";
import Home from "./components/Home";

function App() {

  return (
    <div className="App">
    <ToastContainer
      autoClose={2000}
      position="bottom-right"
    />
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route
        path="/patientDetails/:patientId"
        element={<CollectClinicals />}
      />
      <Route path="/addPatient" element={<AddPatient />} />
      <Route path="/analyze/:patientId" element={<AnalyzeData />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </div>
  )
}

export default App
