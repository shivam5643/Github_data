// src/pages/RepoDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const RepoDetails = () => {
  const { username, repoName } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
        setRepo(response.data);
      } catch (error) {
        console.error("Error fetching repository:", error);
      }
    };
    fetchRepo();
  }, [username, repoName]);

  if (!repo) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div>
      <Header />
      <div className="p-6 bg-gray-100">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-bold">{repo.name}</h2>
          <p className="text-gray-700 mt-2">{repo.description || "No description available"}</p>
          <p className="text-gray-700 mt-2">
            Stars: {repo.stargazers_count} | Forks: {repo.forks_count}
          </p>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepoDetails;
