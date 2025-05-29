import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IssueList from "./components/IssueList";
import IssueDetails from "./components/IssueDetails";
import CreateIssue from "./components/CreateIssue";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";

function App() {
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchIssues = () => {
    axios.get("http://localhost:8080/api/issues")
      .then(response => setIssues(response.data))
      .catch(error => console.error("Error fetching issues:", error));
  };

  const fetchUsers = () => {
    axios.get("http://localhost:8080/api/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchIssues();
    fetchUsers();
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
              <CreateUser onUserCreated={fetchUsers}/>
              <UserList users={users} />
            </>
          } />
          <Route path="/issues/:id" element={<IssueDetails onSave={fetchIssues} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;