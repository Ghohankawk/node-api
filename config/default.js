const mysql = require('mysql');

let account = null;
// 不同环境设置不同配置
switch (process.env.NODE_ENV) {
// 测试环境
case 'test':
    console.log('测试环境');
    account = {
        // 启动端口
        port: process.env.port,
        // 数据库配置
        database: {
            DATABASE: 'datacenter',
            USERNAME: 'root',
            PASSWORD: '123456',
            PORT: '3306',
            HOST: '10.134.85.224'
        }
    };
    break;
    // 生产环境
case 'production':
    console.log('生产环境');
    account = {
        // 启动端口
        port: process.env.port,
        // 数据库配置
        database: {
            DATABASE: 'datacenter',
            USERNAME: 'root',
            PASSWORD: '123456',
            PORT: '3306',
            HOST: '10.134.85.224'
        }
    };
    break;
    // 预发布环境
case 'release':
    console.log('预发布环境');
    account = {
        // 启动端口
        port: process.env.port,
        // 数据库配置
        database: {
            DATABASE: 'datacenter',
            USERNAME: 'root',
            PASSWORD: '123456',
            PORT: '3306',
            HOST: '10.134.85.224'
        }
    };
    break;
    // 本地
default:
    account = {
        // 启动端口
        port: process.env.port,
        // 数据库配置
        database: {
            DATABASE: 'datacenter',
            USERNAME: 'root',
            PASSWORD: '123456',
            PORT: '3306',
            HOST: '10.134.85.224'
        }
    };
}
// 数据库连接池配置
let pool = mysql.createPool({
    host: account.database.HOST,
    user: account.database.USERNAME,
    password: account.database.PASSWORD,
    database: account.database.DATABASE
});
// 单条sql执行器，返回一个promise
let sqlExecute = function (sql, values) {
    return new Promise((resolve, reject) => {
        // 获取数据库连接
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(`获取数据库连接失败：${err}`);
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        console.log(`执行sql语句:${sql}失败：${err}`);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    // 释放连接
                    connection.release();
                });
            }
        });
    });
};
module.exports = {
    account,
    sqlExecute
};
