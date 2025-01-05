
import express from "express";
import { saveUser, deleteUser, updateUser, getUsers, searchUsers, findMutualFollowersAndAddAsFriends } from "../controllers/userController.js";

const router = express.Router();


router.post("/", saveUser);              
router.delete("/:username", deleteUser); 
router.put("/:username", updateUser);    
router.get("/", getUsers);               
router.get("/search", searchUsers);      


router.get("/:username/friends", findMutualFollowersAndAddAsFriends);

export default router;
