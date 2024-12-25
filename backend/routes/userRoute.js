import express from 'express';
import { register , login ,logout , getOtherUsers } from '../controllers/userController.js';
const router = express.Router();
import  isAuthenticated  from '../middleware/isAuthenticated.js';
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated , getOtherUsers);

export default router;