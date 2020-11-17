const KoaRouter = require('koa-router');

const { signIn, signUp } = require('../controllers');

const authRouter = new KoaRouter();

authRouter.post('/signin', signIn).post('/signup', signUp);

module.exports = authRouter;
