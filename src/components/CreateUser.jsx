import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

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
        <div className="create-user">
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit} className="user-form">
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
        </div>
    );
}

CreateUser.propTypes = {
    onUserCreated: PropTypes.func.isRequired,
};

export default CreateUser;