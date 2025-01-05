import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RepoList from './pages/RepoList';
import RepoDetails from './pages/RepoDetails';
import Followers from './pages/Followers';
// import ErrorPage from './pages/ErrorPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repos/:username" element={<RepoList />} />
      <Route path="/repos/:username/:repo" element={<RepoDetails />} />
      <Route path="/followers/:username" element={<Followers />} />
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  </Router>
);

export default App;
