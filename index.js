const moment = require('moment');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const morgan = require('koa-morgan');
const json = require('koa-json');
const router = require('./router/router-common');
const config = require('./config/default');
const errorHandle = require('./middleware/errorHandle');


const responseFormatter = require('./middleware/response');
const logUtil = require('./utils/logUtil');


const app = new Koa();
app.use(errorHandle());
app.use(bodyParser());
app.use(json());

app.use(morgan(':req[user_id] on [:date[iso]] :method :url :status :response-time ms = :res[content-length]'));
app.use(cors());
/**
 * logger
 */
app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico') return;
    const start = moment();
    let ms;
    try {
        await next();
        ms = moment() - start;
        logUtil.logResponse(ctx, ms);
    } catch (error) {
        ms = moment() - start;
        logUtil.logError(ctx, error, ms);
    }
});

/**
 * format response output
 */
app.use(responseFormatter());

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.account.port);
console.log(`The server is on port ${config.account.port}`);
