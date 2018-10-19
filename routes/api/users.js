const router = require("express").Router();
const handleAsyncError = require("express-async-wrap");
const userHandler = require("../../handlers/user_handler");
const jwt = require("../../middlewares/jwt_middleware");

router.post("/users", handleAsyncError(userHandler.registerNewUser));

router.post("/users/login", userHandler.login);

router.get("/user", jwt.required, handleAsyncError(userHandler.getCurrentUser));

router.put(
  "/user",
  jwt.required,
  handleAsyncError(userHandler.updateCurrentUser)
);

module.exports = router;
