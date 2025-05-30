import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import UserPage from "./pages/UserPage";
import IssuesPage from "./pages/IssuesPage"

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Issues</Link> | <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/*" element={<IssuesPage />} />
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;