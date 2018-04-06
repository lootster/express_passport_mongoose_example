const router = require("express").Router();
const jwt = require("../../middlewares/jwt_middleware");

router.get("/", jwt.required, function(req, res) {
  res.json({
    todos: ["secret todo 1", "my other secret todo", "another secret todo"]
  });
});

module.exports = router;
