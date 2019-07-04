let axios = require('axios');
let Cache = require('axios-extensions').Cache;
let cacheAdapterEnhancer = require('axios-extensions').cacheAdapterEnhancer;

let http = {};

let instance = axios.create({
    baseURL: 'http://10.143.58.140:8080',
    headers: { 'Cache-Control': 'no-cache' },
    adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
        enabledByDefault: true,
        defaultCache: new Cache({ maxAge: 1000 * 60 * 60 * 24, max: 200 })
    })
});

// Add a request interceptor
// Do something before request is sent
// Do something with request error
instance.interceptors.request.use(config => config,
    error => Promise.reject(error));

// Add a response interceptor
// Do something with response data
// Do something with response error
instance.interceptors.response.use(response => response,
    error => Promise.reject(error));

/**
 *
 * get 请求
 * @param {*} url
 * @param {*} params
 */
http.get = (url, params) => new Promise((res, rej) => {
    instance.get(url, {
        params
    })
        .then((data) => {
            res(data);
        })
        .catch((err) => {
            rej(err);
        });
});
/**
 *
 * post 请求
 * @param {*} url
 * @param {*} params
 */
http.post= (url, params) => new Promise((res, rej) => {
    instance.post(url, params)
        .then((data) => {
            res(data);
        })
        .catch((error) => {
            rej(error);
        });
});

/**
 *
 * delet 请求
 * @param {*} url
 * @param {*} params
 */
http.delete = (url, params) => new Promise((res, rej) => {
    instance.post(url, {
        params
    })
        .then((data) => {
            res(data);
        })
        .catch((error) => {
            rej(error);
        });
});
module.exports = http;
