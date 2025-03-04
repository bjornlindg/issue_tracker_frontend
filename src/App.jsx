import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios"; 

function App() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = () => {
    axios.get("http://localhost:8080/api/issues")
      .then(response => setIssues(response.data))
      .catch(error => console.error("Error fetching issues:", error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newIssue = { title, description, status };

    axios.post("http://localhost:8080/api/issues", newIssue)
      .then(() => {
        fetchIssues(); // Refresh issues list
        setTitle("");
        setDescription("");
        setStatus("Open"); // Reset form fields
      })
      .catch(error => console.error("Error adding issue:", error));
  };

  return (
    <div className="container">
      <h1>Issue Tracker</h1>

      {/* Form for adding an issue */}
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
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        <button type="submit">Add Issue</button>
      </form>

      {/* List of issues */}      
      <ul className="issues-list">
        {issues.map(issue => (
          <li key={issue.id} className="issue-item">
            <strong>{issue.title}</strong> - {issue.status}
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App;
