const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

async function generateUniqueUsername(baseUsername) {
  let username = baseUsername;
  let userExists = await User.findOne({ username }).lean();

  let counter = 1;
  while (userExists) {
    username = `${baseUsername}${counter}`;
    userExists = await User.findOne({ username }).lean();
    counter++;
  }

  return username;
}

function generateDefaultUsername(name) {
  return name.replace(/\s+/g, "").toLowerCase();
}

exports.create = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;

    const userExist = await User.findOne({ email }).lean();
    if (userExist) {
      return res.status(StatusCodes.FORBIDDEN).json({
        errorCode: 1,
        status: false,
        message: "Email already in use",
        data: null,
      });
    }

    let defaultUsername = generateDefaultUsername(name);
    const uniqueUsername = await generateUniqueUsername(defaultUsername);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username: uniqueUsername,
      email,
      number,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(StatusCodes.CREATED).json({
      errorCode: 0,
      status: true,
      message: "User added successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorCode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).lean();
    if (!existingUser) {
      return res.status(StatusCodes.FORBIDDEN).json({
        errorCode: 1,
        status: false,
        message: "Email doesn't exist",
        data: null,
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(StatusCodes.FORBIDDEN).json({
        errorCode: 2,
        status: false,
        message: "Incorrect Password",
        data: null,
      });
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "300d" });

    return res.status(StatusCodes.OK).json({
      errorCode: 0,
      status: true,
      message: "User Login Successfully",
      data: { ...existingUser, password: undefined, token },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorCode: 5,
      status: false,
      message: error.message,
      data: null,
    });
  }
};
