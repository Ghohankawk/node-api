const nodemailer = require('nodemailer');
const config = require('../config/email');

let email = {};

const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: config.email.auth
});


let mailOptions = (to, text) => ({
    from: `${config.email.auth.user}@sogou-inc.com`,
    to,
    subject: '【翻译后台】邮件通知',
    text
});

let mailOptions2 = (to, html) => ({
    from: `${config.email.auth.user}@sogou-inc.com`,
    to,
    subject: '【翻译后台】邮件通知',
    html
});

email.sendText = async (to, content) => new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions(to, content), (err, info) => {
        if (err) {
            reject(err);
        } else {
            console.log('Message sent: %s', info.messageId);
            resolve(info);
        }
    });
});

email.sendHtml = async (to, content) => new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions2(to, content), (err, info) => {
        if (err) {
            reject(err);
        } else {
            console.log('Message sent: %s', info.messageId);
            resolve(info);
        }
    });
});
module.exports = email;
