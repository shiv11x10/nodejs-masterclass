import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);

//check if user is logged in then go to next middleware
export const loginRequired = (req, res, next) => {
  // we have added the req.user parameter in index.js while verifying JWT token
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

// Register the user by saving the details(hash encrypt the password for security)
export const register = (req, res) => {
  const newUser = new User(req.body);
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      // we do not return back the password as it is sensitive.
      user.hashPassword = undefined;
      return res.json(user);
    }
  });
};

// check if user is available in the database. Return a signed token on succcess.
export const login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) throw err;
      if (!user) {
        res
          .status(401)
          .json({ message: "Authentication failed. No user found" });
      } else if (user) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
          res
            .status(401)
            .json({ message: "Authentication failed. Wrong password" });
        } else {
          return res.json({
            token: jwt.sign(
              { email: user.email, username: user.username, _id: user.id },
              "RESTFULAPIs"
            ),
          });
        }
      }
    }
  );
};
