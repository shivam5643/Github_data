import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserRepos } from '../services/api';

const RepoDetails = () => {
  const { username, repo } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);

  useEffect(() => {
    fetchUserRepos(username)
      .then((res) => {
        const foundRepo = res.data.find((r) => r.name === repo);
        setRepoDetails(foundRepo);
      })
      .catch((err) => console.error(err));
  }, [username, repo]);

  return (
    <div className="repo-details">
      {repoDetails && (
        <>
          <h1>{repoDetails.name}</h1>
          <p>{repoDetails.description}</p>
          <a href={repoDetails.html_url} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        </>
      )}
    </div>
  );
};

export default RepoDetails;
