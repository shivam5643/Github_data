// routes/userRoutes.js
import express from "express";
import { saveUser, deleteUser, updateUser, getUsers, searchUsers, findMutualFollowersAndAddAsFriends } from "../controllers/userController.js";

const router = express.Router();

// Existing routes
router.post("/", saveUser);              // Save GitHub User
router.delete("/:username", deleteUser); // Soft Delete User
router.put("/:username", updateUser);    // Update User
router.get("/", getUsers);               // Get All Users Sorted
router.get("/search", searchUsers);      // Search Users by Criteria

// New route to find mutual followers and add them as friends
router.get("/:username/friends", findMutualFollowersAndAddAsFriends);

export default router;
