const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const initializePassport = require("../passport-strategy.js");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Initialize Passport with the local strategy
initializePassport(passport);

exports.signup_post = [
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("confirm-password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  (req, res, next) => {
    //To do: SHould probably check case sensitivity
    //Checks there isn't an existing user with the same name
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          res.json("User already exists");
        } else {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              return next(err);
            }
            const user = new User({
              username: req.body.username,
              password: hashedPassword,
            }).save((err) => {
              if (err) {
                return next(err);
              }
              res.redirect("/");
            });
          });
        }
      })
      .catch((err) => {
        return next(err);
      });
  },
];

exports.login_post = (req, res, next) => {
  //Checks for errors, generates a token and returns the payload + the token to the client
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      // If there is an error or user is not authenticated
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    // If user is authenticated, login and generate a token
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.send(err);
      }
      // Generate a signed JWT token and send it to the client
      const payload = {
        username: user.username,
        _id: user._id
      }
      const token = jwt.sign(payload, "jwt_secret");
      return res.json({ payload, token });
    });
  })(req, res, next);
};

exports.logout_get = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
