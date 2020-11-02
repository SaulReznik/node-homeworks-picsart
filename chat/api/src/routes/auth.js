const KoaRouter = require('koa-router');

const { signIn, signUp } = require('../controllers/auth');

const authRouter = new KoaRouter();

authRouter.post('/signin', signIn).post('/signup', signUp);

module.exports = authRouter;
