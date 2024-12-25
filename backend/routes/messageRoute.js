import express from 'express';
import {  sendMessage  , getMessage} from '../controllers/messageController.js';
const router = express.Router();

import  isAuthenticated  from '../middleware/isAuthenticated.js';

router.route("/send/:id").post(isAuthenticated , sendMessage);
router.route("/:id").get(isAuthenticated , getMessage);



export default router;