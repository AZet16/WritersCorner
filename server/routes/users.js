import express from "express";
import {
    getUser,
    getUserFollowers,
    addRemoveFollower,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//CRUD- create, read, update, delete features

/*READ routes: where we grab information*/
router.get("/:id", verifyToken, getUser); // query string
router.get("/:id/friends", verifyToken, getUserFollowers);

/*Update */
router.patch("/:id/:followerId", verifyToken, addRemoveFollower);

export default router;