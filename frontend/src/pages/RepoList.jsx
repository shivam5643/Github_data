import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser, fetchUserRepos } from '../services/api';

const RepoList = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(username)
      .then((res) => setUser(res.data[0]))
      .catch((err) => console.error(err));

    fetchUserRepos(username)
      .then((res) => setRepos(res.data))
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <div className="repo-list">
      {user && (
        <div className="user-info">
          <img src={user.avatar_url} alt={`${user.username} avatar`} />
          <h2>{user.username}</h2>
          <p>{user.bio}</p>
          <button onClick={() => navigate(`/followers/${username}`)}>Followers</button>
        </div>
      )}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} onClick={() => navigate(`/repos/${username}/${repo.name}`)} style={{ cursor: "pointer" }} >
            {repo.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
