const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = require("../app");
const { findOneById, findOneByEmail } = require("../queries/user.queries");

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findOneById(id);

    return done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await findOneByEmail(email);

        if (!user) {
          return done(null, false, { message: "Email not found" });
        }

        if (await user.isPasswordValid(password)) {
          return done(null, user);
        }

        return done(null, false, { message: "Invalid password" });
      } catch (err) {
        done(err);
      }
    }
  )
);
