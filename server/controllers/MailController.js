const nodemailer = require('nodemailer');
const emailconfig = require('../config/emailconfig');
//const Mail = require('../models/Mail');

class MailController {
    constructor(config) {
        this.config = emailconfig;
        this.transporter = nodemailer.createTransport(config);
    }

    Send(mail){
        this.transporter.sendMail(mail, function(error, info){
            console.log(error);
        });
    }
}

const mailController = new MailController(emailconfig);
module.exports = mailController;