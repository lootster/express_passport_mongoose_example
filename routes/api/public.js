const router = require("express").Router();
const jwt = require("../../middlewares/jwt_middleware");

router.get("/", jwt.optional, function(req, res) {
  res.json({
    message:
      "you can access this endpoint because this route doesn't require JWTs",
    details: ["some data 1", "some data 2", "some data 3"]
  });
});

module.exports = router;
