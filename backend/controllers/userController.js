import User from '../models/userModel.js';
import axios from 'axios';

export const saveUser = async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const githubUserData = await axios.get(`https://api.github.com/users/${username}`)
      .then((response) => response.data);

    if (githubUserData.message === "Not Found") {
      return res.status(404).json({ message: "GitHub user not found" });
    }

    const newUser = new User({
      username,
      location: githubUserData.location,
      blog: githubUserData.blog,
      bio: githubUserData.bio,
      public_repos: githubUserData.public_repos,
      public_gists: githubUserData.public_gists,
      followers: githubUserData.followers,
      following: githubUserData.following,
      avatar_url: githubUserData.avatar_url,
      created_at: githubUserData.created_at,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: `An error occurred while saving the user: ${err.message}` });
  }
};

export const findMutualFollowersAndAddAsFriends = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).populate('followers following', 'username _id');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = user.following;

    for (const followedUser of following) {
      const isMutual = followedUser.following.some(
        (follower) => follower.username === user.username
      );

      if (isMutual) {
        if (!user.friends.includes(followedUser._id)) {
          user.friends.push(followedUser._id);
        }

        if (!followedUser.friends.includes(user._id)) {
          followedUser.friends.push(user._id);
        }
      }
    }

    await user.save();

    for (const followedUser of following) {
      await followedUser.save();
    }

    res.status(200).json({ message: "Mutual followers added as friends", user });
  } catch (err) {
    console.error("Error finding mutual followers:", err);
    res.status(500).json({ error: "An error occurred while adding friends." });
  }
};

export const searchUsers = async (req, res) => {
  const { username, location } = req.query;

  try {
    const query = {};
    if (username) {
      query.username = { $regex: username, $options: "i" };
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const users = await User.find(query).select("-__v");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error searching users:", err);
    res.status(500).json({ error: "An error occurred while searching for users." });
  }
};

export const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isDeleted) {
      return res.status(400).json({ error: 'User already deleted' });
    }

    user.isDeleted = true;
    await user.save();
    res.status(200).json({ message: `User ${username} soft deleted!`, user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', details: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { username } = req.params;
  const updates = req.body;

  try {
    if (updates.username && typeof updates.username !== 'string') {
      return res.status(400).json({ error: 'Username must be a string' });
    }

    const updatedUser = await User.findOneAndUpdate({ username }, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: `User ${username} updated successfully!`, user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', details: err.message });
  }
};

export const getUsers = async (req, res) => {
  const { sortBy } = req.query;

  const allowedFields = ['public_repos', 'public_gists', 'followers', 'following', 'created_at'];
  if (sortBy && !allowedFields.includes(sortBy)) {
    return res.status(400).json({ error: `Invalid field for sorting: ${sortBy}` });
  }

  try {
    const users = await User.find({ isDeleted: false }).sort({ [sortBy]: 1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users', details: err.message });
  }
};
