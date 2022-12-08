import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


// @desc    Register a new user
// @route   POST /api/user
// @access  Public
const create = asyncHandler(async (req, res) => {
  console.log("Req Body :--> ");
  console.log(req.body);

  const {
    userName,
    password,
  } = req.body;

  const userExists = await User.findOne({ userName });
  console.log(userExists)
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    userName, password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


export {
  create
};
