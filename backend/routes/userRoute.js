// import express from 'express';
// import { register , login ,logout , getOtherUsers } from '../controllers/userController.js';
// const router = express.Router();
// import  isAuthenticated  from '../middleware/isAuthenticated.js';
// router.route("/register").post(register);
// router.route("/login").post(login);
// router.route("/logout").get( isAuthenticated ,logout);
// router.route("/").get(isAuthenticated , getOtherUsers);

// export default router;

import express from "express";
import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated,logout);
router.route("/").get(isAuthenticated,getOtherUsers);

export default router;