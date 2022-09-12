import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    if (req.body.isAdmin === "true") {
      return res.status(403).send("Cannot make yourself an admin on creation");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new userModel({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("new user is created");
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("Wrong username or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).send("Wrong username or password");
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    return res
      .cookie("session_token", token, { httpOnly: true })
      .status(201)
      .send(`Successfully logged in!`);
  } catch (error) {
    console.error(error);
  }
};
