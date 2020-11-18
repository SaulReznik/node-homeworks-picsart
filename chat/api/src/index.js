const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const { PORT, DB_URI } = require('./config');
const authRoutes = require('./routes/auth');

const app = new Koa();
const router = new KoaRouter();

//MongoDB connection
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  await next();
});
app.use(router.routes()).use(router.allowedMethods());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

app.listen(PORT || 3001);
