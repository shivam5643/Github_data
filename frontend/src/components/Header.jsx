// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">GitHub Repo Viewer</h1>
    <Link to="/" className="text-blue-400 hover:text-blue-300">
      Go Back to Search
    </Link>
  </header>
);

export default Header;
