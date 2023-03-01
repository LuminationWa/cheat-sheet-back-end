const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

function initializePassport(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          user.checkPassword(password, function (err, isMatch) {
            if (err) {
              return done(err);
            }
            if (!isMatch) {
              return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user);
          });
        });
      }
    )
  );
}

initializePassport(passport);
module.exports = initializePassport;
