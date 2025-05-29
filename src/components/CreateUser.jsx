import { useState } from "react";
import axios from "axios";

function CreateUser({ onUserCreated }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { firstName, lastName };

    axios.post("http://localhost:8080/api/users", newUser)
      .then(() => {
        setFirstName("");
        setLastName("");
        onUserCreated();
      })
      .catch(error => console.error("Error creating user:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>Create User</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default CreateUser;