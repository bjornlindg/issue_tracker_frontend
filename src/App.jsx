import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/issues")
      .then(response => setIssues(response.data))
      .catch(error => console.error("Error fetching issues:", error));
  }, []);

  return (
    <div>
      <h1>Issues:</h1>
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>
            <strong>{issue.title}</strong> - {issue.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
