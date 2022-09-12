import userModel from "../models/userModel.js";
import invalidateCookie from "../utils/cookieInvalidation.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find({}, { password: 0 });
    res.status(202).json(allUsers);
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { password, ...remainingUserData } = user._doc;
    res.status(200).json(remainingUserData);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send(`user has been successfully deleted`);
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log(req.user.isAdmin);
    console.log(req.body.isAdmin);
    console.log(req.user.id);
    console.log(req.params.id);

    // userModel.findById(req.params.id, (err, data) => {
    //   console.log(data.isAdmin === true);
    // });

    if (req.user.isAdmin === false && req.body.isAdmin === true) {
      return res.status(403).send("Cannot make yourself an admin with update");
    }

    if (req.user.id === req.params.id && req.user.isAdmin === true) {
      console.log("sausainiu trynimas");
      res.cookie("session_token", { maxAge: 0 });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
  }
};
