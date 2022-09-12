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

    // if requester is not admin, he cannot request to be admin
    // request to become admin can be written in 2 ways - "true" and true so need to check both
    if (
      req.user.isAdmin === false &&
      (req.body.isAdmin === true || req.body.isAdmin === "true")
    ) {
      return res.status(403).send("Cannot make yourself an admin with update");
    }

    // if requester is admin and his request is to unadmin himself then delete cookies too
    if (
      req.user.id === req.params.id &&
      req.user.isAdmin === true &&
      (req.body.isAdmin === false || req.body.isAdmin === "false")
    ) {
      console.log("cookie deletion");
      invalidateCookie(req, res);
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
