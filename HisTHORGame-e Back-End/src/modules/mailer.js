const nodemailer = require('nodemailer');
const mailConfig = require('../config/email.json');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transport = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    }
  });

  transport.use('compile', hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resources/mail/')
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
  }));

  module.exports = transport;