import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

function CreateIssue({ onIssueCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newIssue = { title, description };

    axios.post("http://localhost:8080/api/issues", newIssue)
      .then(() => {
        setTitle("");
        setDescription("");
        onIssueCreated(); // Refresh the issue list
      })
      .catch(error => console.error("Error adding issue:", error));
  };

  return (
    <div className="create-issue">
      <h2>Create New Issue</h2>
      <form onSubmit={handleSubmit} className="issue-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Issue</button>
      </form>
    </div>
  );
}

CreateIssue.propTypes = {
  onIssueCreated: PropTypes.func.isRequired,
};

export default CreateIssue;
