const jwt = require("jsonwebtoken");

const generaterToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_TOKEN, {
    expiresIn: "7d", // Set your desired token expiration time here
  });
  return token;
};

module.exports = { generaterToken };
