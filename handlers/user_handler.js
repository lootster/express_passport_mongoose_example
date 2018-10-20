const User = require("../models/User");

async function registerNewUser(req, res) {
  var user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  await user.save();
  return res.json({ user: user.toAuthJSON() });
}

async function login(req, res) {
  const email = req.body.user.email;
  if (!email) {
    return res.status(422).json({ errors: { email: ["can't be blank"] } });
  }

  const password = req.body.user.password;
  if (!password) {
    return res.status(422).json({ errors: { password: ["can't be blank"] } });
  }

  let user = await User.findOne({ email: email });
  if (!user || !user.validPassword(password)) {
    return res.status(422).json({
      errors: { "email or password": ["is invalid"] }
    });
  }
  // send token via res.cookie()
  const token = user.generateJWT();
  // TODO: we should also set "secure" option to true in the cookie, if our service supports HTTPS
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: true
  });

  return res.json({ user: user.toAuthJSON() });
}

async function getCurrentUser(req, res) {
  const userId = req.jwt.userid;
  const user = await User.findById(userId);

  return res.status(200).json({ user: user.toAuthJSON() });
}

async function updateCurrentUser(req, res) {
  const userId = req.jwt.userid;
  const user = await User.findById(userId);

  const newUserProfile = req.body.user;
  if (!newUserProfile) {
    return res.status(422).json({
      errors: { "user profile": "User profile information is not given." }
    });
  }
  ["email", "username", "image", "bio"].forEach(detail => {
    if (newUserProfile[detail]) {
      user[detail] = newUserProfile[detail];
    }
  });

  if (newUserProfile.password) {
    user.setPassword(newUserProfile.password);
  }

  await user.save();
  return res.json({ user: user.toAuthJSON() });
}

async function resolveUsername(username) {
  return await User.findOne({ username: username });
}

module.exports = {
  registerNewUser,
  login,
  getCurrentUser,
  updateCurrentUser,
  resolveUsername
};
