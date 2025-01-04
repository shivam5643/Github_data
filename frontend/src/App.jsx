// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RepositoryPage from "./pages/RepositoryPage";
import RepoDetails from "./pages/RepoDetails";
import FollowersPage from "./pages/FollowersPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repos/:username" element={<RepositoryPage />} />
      <Route path="/repos/:username/:repoName" element={<RepoDetails />} />
      <Route path="/followers/:username" element={<FollowersPage />} />
    </Routes>
  </Router>
);

export default App;
