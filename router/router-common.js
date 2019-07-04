const Router = require('koa-router');
const cache = require('../controller/cache-controller');

const router = new Router();

router.get('/api/v1/test', cache.test);
router.get('/api/v2/test', cache.test);
router.get('/demo/insertone', cache.insertOne);
router.get('/demo/querybycode', cache.queryByCode);
router.post('/demo/querybytype', cache.queryByType);
router.post('/demo/removebycode', cache.removeByCode);
router.post('/demo/removebytype', cache.removeByType);
router.post('/demo/queryall', cache.queryAll);

module.exports = router;
