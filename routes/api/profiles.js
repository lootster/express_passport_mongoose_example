const router = require("express").Router();
const handleAsyncError = require("express-async-wrap");
const profileHandler = require("../../handlers/profile_handler");
const userHandler = require("../../handlers/user_handler");
const jwt = require("../../middlewares/jwt_middleware");

router.param(
  "username",
  handleAsyncError(async (req, res, next, username) => {
    let user = await userHandler.resolveUsername(username);
    if (!user) {
      return res.sendStatus(404);
    }
    req.forUser = user;
    return next();
  })
);

router.get(
  "/:username",
  jwt.optional,
  handleAsyncError(profileHandler.getUserProfile)
);
module.exports = router;
