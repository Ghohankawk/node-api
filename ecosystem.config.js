module.exports = {
    apps: [{
        name: 'fanyi-api-development',
        script: 'index.js',
        autorestart: true,
        output: './logs/out.log',
        error: './logs/error.log',
        log: './logs/combined.outerr.log',
        env: {
            NODE_ENV: 'development',
            LOGGER_LEVEL: 'info',
            port: 3000
        }
    }, {
        name: 'fanyi-api-production',
        script: 'index.js',
        autorestart: true,
        output: './logs/out.log',
        error: './logs/error.log',
        log: './logs/combined.outerr.log',
        max_memory_restart: '1000M',
        instances: 'max',
        exec_mode: 'cluster',
        env: {
            NODE_ENV: 'production',
            port: 3000
        }
    }, {
        name: 'fanyi-api-test',
        script: 'index.js',
        autorestart: true,
        output: './logs/out.log',
        error: './logs/error.log',
        log: './logs/combined.outerr.log',
        env: {
            NODE_ENV: 'test',
            port: 3000
        }
    }, {
        name: 'fanyi-api-release',
        script: 'index.js',
        autorestart: true,
        output: './logs/out.log',
        error: './logs/error.log',
        log: './logs/combined.outerr.log',
        env: {
            NODE_ENV: 'release',
            port: 3000
        }
    }]
};
