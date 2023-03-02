const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const bcrypt = require("bcryptjs");

function initializePassport(passport) {
  //Configure LocalStrategy
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
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user);
            } else {
              // passwords do not match!
              return done(null, false, { message: "Incorrect password" });
            }
          });
        });
      }
    )
  );
  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

initializePassport(passport);
module.exports = initializePassport;
