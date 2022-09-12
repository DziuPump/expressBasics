import express from "express";
import { verifySessionTokenUser, verifySessionTokenAdmin } from "../authCheck/authCheck.js";
import { deleteUserById, getAllUsers, getUserById, updateUser } from "../controller/userController.js";

const router = express.Router();



router.get('/get', verifySessionTokenAdmin, getAllUsers);

router.get('/get/:id', verifySessionTokenUser, getUserById);

router.delete('/delete/:id', verifySessionTokenUser, deleteUserById);

router.put('/update/:id', verifySessionTokenUser, updateUser);

// router.put('delete/', verifySessionTokenAdmin, deleteAllUsers);

export default router;