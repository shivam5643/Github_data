// src/pages/RepositoryDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const RepositoryDetails = () => {
  const { username, repoName } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/${username}/${repoName}`
        );
        setRepoDetails(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repository details:", error);
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [username, repoName]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (!repoDetails) {
    return (
      <div className="text-center text-gray-500">
        Repository details not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Repository Details */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={repoDetails.owner.avatar_url}
            alt={`${repoDetails.owner.login}'s avatar`}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">{repoDetails.name}</h1>
            <p className="text-sm text-gray-500">
              Owned by{" "}
              <a
                href={repoDetails.owner.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {repoDetails.owner.login}
              </a>
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{repoDetails.description}</p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold">Details:</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <strong>Stars:</strong> {repoDetails.stargazers_count}
            </li>
            <li>
              <strong>Forks:</strong> {repoDetails.forks_count}
            </li>
            <li>
              <strong>Open Issues:</strong> {repoDetails.open_issues_count}
            </li>
            <li>
              <strong>Language:</strong> {repoDetails.language}
            </li>
          </ul>
        </div>

        <a
          href={repoDetails.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          View on GitHub
        </a>
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <Link
          to={`/repos/${username}`}
          className="text-blue-500 underline text-sm"
        >
          ← Back to repository list
        </Link>
      </div>
    </div>
  );
};

export default RepositoryDetails;
