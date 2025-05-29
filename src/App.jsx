import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import IssueList from "./components/IssueList";
import IssueDetails from "./components/IssueDetails";
import CreateIssue from "./components/CreateIssue";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import UserPage from "./pages/UserPage";

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
      <nav>
        <Link to="/">Issues</Link> | <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <>
            <CreateIssue onIssueCreated={fetchIssues}/>
            <IssueList issues={issues}/>
          </>
        } />
        <Route path="/issues/:id" element={<IssueDetails onSave={fetchIssues}/>} />
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;