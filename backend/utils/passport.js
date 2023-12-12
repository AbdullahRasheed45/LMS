const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "597405527167-gc8hm9nl0aemk7cu4ghkb4ber8gi8mmu.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      let data = profile?._json;
      try {
        // Check if user already exists based on the Google ID
        const user = await User.findOne({ email: data.email });

        if (!user) {
          // If user doesn't exist, create a new user in the database
          const newUser = await User.create({
            firstname: data.name,
            lastname: data.given_name,
            user_image: data.picture,
            email: data.email,
            roles: "user",
            // You might want to save other profile information here
          });

          // Return the newly created user
          return done(null, newUser);
        }

        // Return the existing user
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Save the user's ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Retrieve user from database and attach to req.user
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
