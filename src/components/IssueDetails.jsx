import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Issuedetails.css"

function IssueDetails( { onSave } ) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [assignedUser, setAssignedUser] = useState("");


  useEffect(() => {
    axios.get(`http://localhost:8080/api/issues/${id}`)
      .then(response => {
        setIssue(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setStatus(response.data.status);
        setAssignedUser(response.data.assignedUser)
      })
      .catch(error => console.error("Error fetching issue:", error));
  }, [id]);

  const handleSave = () => {
    axios.put(`http://localhost:8080/api/issues/${id}`, { title, description, status })
      .then(() => {
        onSave();
        navigate("/");
    })
      .catch(error => console.error("Error updating issue:", error));
  };

  const handleCancel = () => navigate("/");

  if (!issue) return <p>Loading...</p>;
  
  return (
    <div className="container">
      <h2>Issue Details</h2>

      <div className="field">
        <label>ID:</label>
        <span>{issue.id}</span>
      </div>

      <div className="field">
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="field">
        <label>Description:</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="field">
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <div className="field">
        <label>Assigned user:</label>
        <input value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} />
      </div>

      <div className="field">
        <label>Created At:</label>
        <span>{issue.createdAt}</span>
      </div>

      <div className="field">
        <label>Updated At:</label>
        <span>{issue.updatedAt}</span>
      </div>

      <div className="button-group">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default IssueDetails;
