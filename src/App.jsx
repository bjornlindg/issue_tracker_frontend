import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios"; 

function App() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = () => {
    axios.get("http://localhost:8080/api/issues")
      .then(response => setIssues(response.data))
      .catch(error => console.error("Error fetching issues:", error));
  };

  return (
    <div className="container">
      <h1>Issue Tracker</h1>
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
