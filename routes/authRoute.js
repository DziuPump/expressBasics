import express from 'express';
import { createUser, loginUser } from "../controller/authController.js";
const router = express.Router();

//User creation
router.post("/register", createUser);

//User login
router.post("/login", loginUser);

export default router;