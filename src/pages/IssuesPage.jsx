import IssueList from "../components/IssueList";
import IssueDetails from "../components/IssueDetails";
import CreateIssue from "../components/CreateIssue";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

function IssuesPage() {
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
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <div className="container">
                            <CreateIssue onIssueCreated={fetchIssues} />
                            <IssueList issues={issues} />
                        </div>
                    </>
                }
            />
            <Route
                path="/issues/:id"
                element={<IssueDetails onSave={fetchIssues} />}
            />
        </Routes>
    );
}

export default IssuesPage;