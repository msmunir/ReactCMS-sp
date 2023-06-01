//Import user,bcrypt and auth
const User = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const auth = require("../authentication/auth");
const { admins } = require("../authentication/auth");

//Register a new user
const registerNewUser = async (req, res) => {
  const {
    firstName,
    lastName,
    streetName,
    postalCode,
    city,
    mobile,
    company,
    email,
    password,
    profileImage,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !streetName ||
    !postalCode ||
    !city ||
    !email ||
    !password
  ) {
    return res.status(400).json({
      message: "Please fill in all fields",
    });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      message: "User allready exists",
    });
  }

  const salt = bcrypt.genSaltSync(10);

  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: "Error hashing password",
      });
    }

    User.create({
      firstName,
      lastName,
      streetName,
      postalCode,
      city,
      mobile,
      company,
      email,
      profileImage,
      passwordHash: hash,
    }).then((user) => {
      res.status(201).json({
        token: auth.generateToken(user),
      });
    });
  });
};

//Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill in all fields",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    bcrypt.compare(password, user.passwordHash, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error comparing passwords",
        });
      }

      if (!result) {
        return res.status(401).json({
          message: "Incorrect email or password",
        });
      }
      res.status(200).json({
        token: auth.generateToken(user),
      });
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while logging in",
      error: err.message,
    });
  }
};

//Login Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill in all fields",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    bcrypt.compare(password, user.passwordHash, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error comparing passwords",
        });
      }

      if (!result) {
        return res.status(401).json({
          message: "Incorrect email or password",
        });
      }

      if (!admins.includes(user._id.toString())) {
        return res.status(401).json({
          message: "You need to be an admin to log in",
        });
      }

      res.status(200).json({
        token: auth.generateToken(user),
      });
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while logging in",
      error: err.message,
    });
  }
};

//Get user data and orders
const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Could not find this user",
      });
    }

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      orders: user.orders,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error getting user data",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    if (!allUsers) {
      return res.status(400).json({
        message: "The users could not be found",
      });
    } else {
      return res.status(200).json({ allUsers });
    }
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while getting the users",
      error: err.message,
    });
  }
};

//Export modules
module.exports = {
  registerNewUser,
  loginUser,
  getUserData,
  getAllUsers,
  loginAdmin,
};
