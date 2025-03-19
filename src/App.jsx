import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios"; 

function App() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
    
    const newIssue = { title, description};

    axios.post("http://localhost:8080/api/issues", newIssue)
      .then(() => {
        fetchIssues(); // Refresh issues list
        setTitle("");
        setDescription("");
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
        <button type="submit">Add Issue</button>
      </form>

      {/* List of issues */}      
      <ul className="issues-list">
        {issues.map(issue => (
          <li key={issue.id} className="issue-item">
            {issue.id} - <strong>{issue.title}</strong> - {issue.status} - {issue.description} - {issue.createdAt} - {issue.updatedAt}
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App;
