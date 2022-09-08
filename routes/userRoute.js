import express from "express";
import userModel from "../models/userModel.js";
import { createUser, deleteUserById, getAllUsers, getUserById, updateUser } from "../controller/userController.js";

const router = express.Router();


router.post("/create", createUser);
router.get('/get', getAllUsers);
router.get('/get/:id', getUserById);
router.delete('/delete/:id', deleteUserById);
router.put('/update/:id', updateUser);

export default router;