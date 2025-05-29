import { Link } from "react-router-dom";

function UserList( { users }) {
  return (
    <div className="container">
      <h2>Users:</h2>
      <ul className="users-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <Link to={`/users/${user.id}`}>
              {user.id} - {user.firstName} - {user.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;