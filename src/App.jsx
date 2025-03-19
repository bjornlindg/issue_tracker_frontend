import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IssueList from "./components/IssueList";
import IssueDetails from "./components/IssueDetails";
import CreateIssue from "./components/CreateIssue";  // Import CreateIssue
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [issues, setIssues] = useState([]);

  const fetchIssues = () => {
    axios.get("http://localhost:8080/api/issues")
      .then(response => setIssues(response.data))
      .catch(error => console.error("Error fetching issues:", error));
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <Router>
      <div className="container">
        <h1>Issue Tracker</h1>
        <Routes>
          <Route path="/" element={
            <>
              <CreateIssue onIssueCreated={fetchIssues} />  
              <IssueList issues={issues} />
            </>
          } />
          <Route path="/issues/:id" element={<IssueDetails onSave={fetchIssues} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;