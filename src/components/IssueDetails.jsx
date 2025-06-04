import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Issuedetails.css"
import PropTypes from 'prop-types';

function IssueDetails({ onSave }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedUserId, setAssignedUserId] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/issues/${id}`)
      .then(response => {
        setIssue(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setStatus(response.data.status);
        setAssignedUserId(response.data.assignedUser?.id || null)
      })
      .catch(error => console.error("Error fetching issue:", error));

    axios.get("http://localhost:8080/api/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, [id]);

  const handleSave = () => {
    console.log(assignedUserId);
    axios.put(`http://localhost:8080/api/issues/${id}`, { 
      title, 
      description, 
      status,
      assignedUser: assignedUserId ? { id: assignedUserId } : null 
    })
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
        <label>Assigned User:</label>
        <select value={assignedUserId || ""} onChange={(e) => setAssignedUserId(Number(e.target.value))}>
          <option value="">-- None --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
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

IssueDetails.propTypes = {
  onSave: PropTypes.func.isRequired
};

export default IssueDetails;
