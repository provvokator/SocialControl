const TelegramBot = require('node-telegram-bot-api');
const token = '1207886851:AAFk-WzZB7IPI5Va59Pdvl9BPJRG4hNDFoE';

class BotController {

    constructor(TelegramBot,token) {
        //this.bot = new TelegramBot(token, {polling: true,interval:1000});
        this.bot = new TelegramBot(token, {polling: true});
        this.token = token;
    }

    SendPhoto(ChatName,Url){
        this.bot.sendPhoto(ChatName,Url);
    }

}

var botController = new BotController(TelegramBot,token);

// botController.bot.getChat("@GaySomeBody").then(res=>{
//     console.log(res);
// })

module.exports = botController;

// botController.bot.onText(/start .+@.+\..+/, (msg, match) => {
//     console.log("Additional command test");
//     // db.AddAccount("@"+msg.chat.username,msg.text.split(' ')[1]).then(res=>{
//     //
//     //     // eslint-disable-next-line default-case
//     //     switch (res) {
//     //
//     //         case"success":{
//     //             botController.bot.sendMessage(msg.chat.id,"Поздравляю, ваш аккаунт успешно подключен"+'\n'+
//     //                 "Для того, чтобы подключить бота, перешлите сообщение от botFather с токеном бота"
//     //             )
//     //             break;
//     //         }
//     //
//     //         case "already exist":{
//     //             botController.bot.sendMessage(msg.chat.id,"Данный аккаунт уже существует"
//     //             )
//     //             break;
//     //         }
//     //
//     //         case "not exist":{
//     //             botController.bot.sendMessage(msg.chat.id,"Аккаунт с данной почтой не зарегистрирован в системе"
//     //             )
//     //             break;
//     //         }
//     //
//     //     }
//     //
//     // });
// });

//
// //botController.SendPhoto('@TttDDDBot','https://www.bigstockphoto.com/images/homepage/module-6.jpg')
//
//     //send text
//     //botController.bot.sendMessage("-1001429001544", `Distantion posted`);
//     const url = 'https://telegram.org/img/t_logo.png';
//     //send photo
//     //botController.bot.sendPhoto("-1001429001544",url);
//
//     // botController.bot.on("channel_post",msg=>{
//     //     const chatId = msg.chat.id;
//     //
//     //     // send a message to the chat acknowledging receipt of their message
//     //
//     //     console.log(msg.chat.title);
//     //
//     //     console.log(msg);
//     //
//     //     botController.bot.sendMessage(chatId, `Received your message :` + chatId + msg.chat.title);
//     // })
//     //
//         botController.bot.on("message",msg=>{
//             const chatId = msg.chat.id;
//
//             // send a message to the chat acknowledging receipt of their message
//
//             console.log(msg.chat.title);
//
//             console.log(msg);
//
//             botController.bot.sendMessage(chatId, `Received your message :` + chatId + msg.chat.title);
//         })
//
//  botController.bot.getChat("-1001429001544").then(res=>{
//     console.log(res);
//  })
//
//     // botController.bot.getUpdates().then(res=>{
//     //     console.log(res)
//     // })
//
//     // botController.bot.on("edited_channel_post",msg=>{
//     //     const chatId = msg.chat.id;
//     //
//
//     // })
//
//     send a message to the chat acknowledging receipt of their message
//     botController.bot.sendMessage("@GaySomeBody", `Send test message to channel :`).then(res=>{
//         console.log(res);
//     });

        // botController.bot.editMessageText("Azaza, Nice glaza",{
        //     message_id:146,
        //     chat_id:"@GaySomeBody"
        // })

    //botController.bot.deleteMessage("@GaySomeBody",84);