// var nodemailer = require('nodemailer');
//
// var emailconfig = require('../config/emailconfig');
// var Mail = require("../models/Mail");
// var mailOptions = new Mail('youremail@gmail.com','mark.mark8890@mail.ru','Sending Email using Node.js','Azaza');
// // from: 'youremail@gmail.com',
// //     to: 'mark.mark8890@mail.ru',
// //     subject: 'Sending Email using Node.js',
// //     text: 'That was easy!'
//
// var transporter = nodemailer.createTransport(emailconfig);
//
// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

// var mailController = require('./MailController');
// var Mail = require("../models/Mail");
// var mailOptions = new Mail('youremail@gmail.com','mark.mark8890@mail.ru','Sending Email using Node.js','SuckTestModule');
// mailController.Send(mailOptions);
// console.log(mailController);


//---Crypt test---//

var cryptographer = require('./cryptographer');

var crypttext = cryptographer.encrypt("lalala");

console.log(`Crypted text: ${crypttext}`);

console.log(`Decrypt text:${cryptographer.decrypt(crypttext)}`);