import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Formtwo from "./components/Formtwo";

function App() {
  const [contractor, setContractor] = useState("");
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [submit, setsubmit] = useState(true);
  const handalesubmit = (e) => {
    e.preventDefault();
    setName(e.target.name.value);
    setContractor(e.target.Contractor.value);
    setClient(e.target.Client.value);
    setDescription(e.target.Description.value);
    setsubmit(false)
  };
  return (
    <div className="container">
     <div>
     {submit ? (
        <div className="form-container">
          <h2>prototype XYZ Company</h2>
          <form onSubmit={handalesubmit} className="contact-form">
            <label>Project Name:</label>
            <input
              placeholder="Project Name"
              type="text"
              required
              name="name"
            />
            <label>Contractor:</label>
            <input
              placeholder="Contractor"
              type="text"
              required
              name="Contractor"
            />
            <label>Client:</label>
            <input placeholder="Client" type="text" required name="Client" />

            <label htmlFor="message">Project Description:</label>
            <textarea
              required
              name="Description"
              placeholder="Project Description"
              rows="4"
            />

            <button className="button" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
          <Formtwo name={name} client={client} description={description} contractor={contractor}/>
        </>
      )}
     </div>
    </ div>
  );
}

export default App;
