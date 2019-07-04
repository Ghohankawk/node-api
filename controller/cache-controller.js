const service = require('../service/cache-service');
const http = require('../utils/http');

let returnObj = {
    status: '0',
    message: 'ok',
    result: ''
};

let test = async (ctx) => {
    let type = ctx.query.type;
    await http.get('/reventondc/tool/test').then(async (result) => {
        returnObj.result = result.data;
        returnObj.type = type;
        ctx.body = returnObj;
    });
};

let insertOne = async (ctx) => {
    let { code, value, type } = ctx.request.body;
    await service.insertOne([code, value, type]).then(async (result) => {
        returnObj.result = 'hank';
        ctx.body = returnObj;
    });
};

let queryByCode = async (ctx) => {
    let { code } = ctx.request.body;
    await service.queryByCode(code).then(async (result) => {
        returnObj.result = result;
        ctx.body = returnObj;
    });
};
let queryByType = async (ctx) => {
    let { type } = ctx.request.body;
    await service.queryByType(type).then(async (result) => {
        returnObj.result = result;
        ctx.body = returnObj;
    });
};

let removeByCode = async (ctx) => {
    let { code } = ctx.request.body;
    await service.removeByCode(code).then(async (result) => {
        ctx.body = returnObj;
    });
};

let removeByType = async (ctx) => {
    let { type } = ctx.request.body;
    await service.removeByType(type).then(async (result) => {
        ctx.body = returnObj;
    });
};

let queryAll = async (ctx) => {
    await service.queryAll().then(async (result) => {
        returnObj.result = result;
        ctx.body = returnObj;
    });
};

module.exports = {
    test,
    insertOne,
    queryByCode,
    queryByType,
    removeByCode,
    removeByType,
    queryAll
};
