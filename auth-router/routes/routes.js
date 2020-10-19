const express = require("express");

const jwt = require("jsonwebtoken");

const authRouter = require("./auth");
const usersRouter = require("./users");

const router = express.Router();

// public
router.use(authRouter);

const accessTokenSecret = "4-8-15-16-23-42";
const privateRoutes = ["/user"];

function checkPublicOrPrivate(req, res, next) {
  privateRoutes.forEach(route => {
    if (req.path.includes(route)) {
      return authorization(req, res, next);
    }
  });

  return next();
}

function authorization(req, res, next) {
  const { token } = req.headers;

  if (token) {
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        console.log("cond", err);
        return res.status(403).send("Forbiden, access denied");
      }
      console.log(user);
      next();
    });
  }

  //return next(new Error());
}

router.use(authorization);
router.use(usersRouter);

router.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

router.use(function(err, req, res, next) {
  res.status(500).send("Server error");
});

module.exports = router;
