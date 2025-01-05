import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserFollowers } from '../services/api';

const Followers = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserFollowers(username)
      .then((res) => setFollowers(res.data))
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <div className="followers">
      <h1>{username}'s Followers</h1>
      <ul>
        {followers.map((follower) => (
          <li key={follower._id} onClick={() => navigate(`/repos/${follower.username}`)}>
            {follower.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followers;
