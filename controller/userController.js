import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const createUser =  async (req,res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new userModel({
            ...req.body,
            password: hash,
        });
        await newUser.save();
        res.status(201).send("new user is created");
    } catch (error) {
     console.error(error)
    }
};

export const getAllUsers =  async (req, res) => {
    try {
        const allUsers = await userModel.find({}, {password:0});
        res.status(202).json(allUsers);
    } catch (error) {
        console.error(error);
    }
};

export const getUserById =  async(req,res) => {
    try {
        const user = await userModel.findById(req.params.id);
        const {password, ...remainingUserData} = user._doc;
        res.status(200).json(remainingUserData);
    } catch (error) {
        console.error(error)
    }
};

export const deleteUserById =  async(req,res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).send(`user has been successfully deleted`);
    } catch (error) {
        console.error(error)
    }
};

export const updateUser =  async(req,res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error)
    }
};