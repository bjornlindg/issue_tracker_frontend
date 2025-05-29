import CreateUser from "../components/CreateUser";
import UserList from "../components/UserList";
import { useState, useEffect } from "react";
import axios from "axios";

function UserPage() {
    const [users, setUsers] = useState([]);
    
    const fetchUsers = () => {
    axios.get("http://localhost:8080/api/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
    <div className="container">
      <CreateUser onUserCreated={fetchUsers}/>
      <UserList users={users}/>
    </div>
  );
}

export default UserPage;