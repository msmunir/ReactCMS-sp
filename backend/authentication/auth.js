//Import jwt and dotenv
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Get secret key from .env
const secretKey = process.env.SECRET_KEY;

//Create token
exports.generateToken = (user) => {
  return jwt.sign({ _id: user._id, displayName: user.displayName }, secretKey, {
    expiresIn: "10d",
  });
};

//Verify token
exports.verifyToken = (req, res, next) => {
  //Bearer token
  try {
    const token = req.headers.authorization.split(" ")[1];
    //To get out the id from the decrypted token
    req.userId = jwt.verify(token, secretKey)._id;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired!",
      });
    }

    return res.status(401).json({
      message: "Access restricted! Please Login!",
    });
  }
};

//UserIds that are admins.

const admins = [
  "6464b795afc711ce49643442",
  "6464cb312c3ce1d87fdbde79",
  "6465ffb9c01e67bbc5915574",
  "646f9f4b28703729c136b7c1",
];

//req.userId comes from verifyToken
exports.checkAdmin = (req, res, next) => {
  if (admins.includes(req.userId)) {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "You need be an admin to have access to this." });
  }
};


module.exports.admins = admins;

