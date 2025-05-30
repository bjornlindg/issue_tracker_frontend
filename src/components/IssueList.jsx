import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function IssueList( {issues }) {
  return (
    <div className="container">
      <h2>Issues:</h2>
      <ul className="issues-list">
        {issues.map(issue => (
          <li key={issue.id} className="issue-item">
            <Link to={`/issues/${issue.id}`}>
              {issue.id} - <strong>{issue.title}</strong> - {issue.status} - {issue.description} - {issue.createdAt} - {issue.updatedAt}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

IssueList.propTypes = {
  issues: PropTypes.array.isRequired
};

export default IssueList;
