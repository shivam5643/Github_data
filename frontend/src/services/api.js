import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api/users"; // Adjust based on your backend

export const fetchUser = (username) => axios.get(`${API_BASE_URL}/search?username=${username}`);
export const fetchUserRepos = (username) => axios.get(`https://api.github.com/users/${username}/repos`);
export const fetchUserFollowers = (username) => axios.get(`${API_BASE_URL}/${username}/friends`);
