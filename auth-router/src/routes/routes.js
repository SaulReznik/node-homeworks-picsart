const express = require('express');
const jwt = require('jsonwebtoken');

const authRouter = require('./auth');
const usersRouter = require('./users');

const router = express.Router();

router.use(authRouter);

const accessTokenSecret = '4-8-15-16-23-42';
const privateRoutes = ['/user'];

const checkPublicOrPrivate = (req, res, next) => {
  privateRoutes.forEach(route => {
    if (req.path.includes(route)) {
      return authorization(req, res, next);
    }
  });

  return next();
};

const authorization = (req, res, next) => {
  const { token } = req.headers;

  if (token) {
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).send('Forbiden, access denied');
      }

      return next();
    });
  } else {
    return res.status(403).send('Bad message');
  }
};

router.use(checkPublicOrPrivate);
router.use(usersRouter);

router.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

router.use(function(err, req, res, next) {
  res.status(500).send('Server error');
});

module.exports = router;
