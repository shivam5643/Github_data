// src/pages/FollowersPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const FollowersPage = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/followers`);
        setFollowers(response.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };
    fetchFollowers();
  }, [username]);

  return (
    <div>
      <Header />
      <div className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">{username}'s Followers</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {followers.map((follower) => (
            <li key={follower.id} className="p-4 bg-white rounded-md shadow-md">
              <Link to={`/repos/${follower.login}`} className="text-blue-500 font-semibold">
                {follower.login}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowersPage;
