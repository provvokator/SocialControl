const TelegramBot = require('node-telegram-bot-api');
process.env.NTBA_FIX_319 = 1;
var express = require('express');
var botController = require('../controllers/BotController')
var router = express.Router();
var db = require('../controllers/Database');


var cryptographer = require('../controllers/cryptographer');

// botController.bot.on("message",(msg,match)=>{
//
//
//     if(msg.forward_from.username==="BotFather"){
//         console.log(msg.chat.username);
//         db.AddBot(msg.text.split('\n')[3],"@"+msg.chat.username);
//     }
//
// })

botController.bot.on("message",(msg,match)=>{

    //Стартовое сообщение
    if(/\/start$/.test(msg.text)){

                botController.bot.sendMessage(msg.chat.id, "Привет :), для того, чтобы подключить свой Telegram аккаунт, отправь команду /newaccount ваша почта.\n" +
                    "\n" +
                    "После того, как ваш аккаунт будет добавлен, отправьте сообщение от @BotFather c токеном созданного бота" +"\n" +
            "\n" +
            "Для этого необходимо перейти в канал в @BotFather, отправить команду /newbot и следовать его дальнейшим инструкциям.\n" +
            "\n" +
            "Как только все будет готово, отправь мне полученное у @BotFather сообщение с токеном созданного бота.");
    }

    //Подключение аккаунта
    if(/\/newaccount .+@.+\..+$/.test(msg.text)){
        db.AddAccount("@"+msg.chat.username,msg.text.split(' ')[1]).then(res=>{
        // eslint-disable-next-line default-case
        switch (res) {

            case"success":{
                    botController.bot.sendMessage(msg.chat.id,"Поздравляю, ваш аккаунт успешно подключен"+'\n'+
                    "Для того, чтобы подключить бота, перешлите сообщение от botFather с токеном бота"
                    )
                break;
            }

            case "already exist":{
                botController.bot.sendMessage(msg.chat.id,"Данный аккаунт уже существует"
                )
                break;
            }

            case "not exist":{
                botController.bot.sendMessage(msg.chat.id,"Аккаунт с данной почтой не зарегистрирован в системе"
                )
                break;
            }

        }

    });

    }

 //Подключение бота
    if(msg.forward_from.username==="BotFather"){
        console.log(msg.chat.username);
        db.AddBot(msg.text.split('\n')[3],"@"+msg.chat.username).then(res=>{

            switch (res) {
                case "success":{
                    botController.bot.sendMessage(msg.chat.id,"Поздравляю, бот успешно привязан к данному аккаунту!");
                    break;
                }

                case "already exist":{
                    botController.bot.sendMessage(msg.chat.id,"Бот уже привязан к данному аккаунту");
                    break;
                }

            }

        });
    }


})

// botController.bot.onText(/start .+@.+\..+/, (msg, match) => {
//     console.log("Additional command test");
//
//     // db.AddAccount("@"+msg.chat.username,msg.text.split(' ')[1]).then(res=>{
//     //
//     //     // eslint-disable-next-line default-case
//     //     switch (res) {
//     //
//     //         case"success":{
//     //                 botController.bot.sendMessage(msg.chat.id,"Поздравляю, ваш аккаунт успешно подключен"+'\n'+
//     //                 "Для того, чтобы подключить бота, перешлите сообщение от botFather с токеном бота"
//     //                 )
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

// botController.bot.onText(/\/help/,(msg,match)=>{
//
//         botController.bot.sendMessage(msg.chat.id, "Привет :), для того, чтобы подключить свой Telegram аккаунт, создай бота на этом аккаунте и перешли мне его токен.\n" +
//             "\n" +
//             "Для этого необходимо перейти в канал в @BotFather, отправить команду /newbot и следовать его дальнейшим инструкциям.\n" +
//             "\n" +
//             "Как только все будет готово, отправь мне полученное у @BotFather сообщение с токеном созданного бота.");
//     //}
//
// })
//



//Проверка на те посты, которые нужно отправить
setInterval(async ()=>{

// db.GetSendingPosts().then(result=>{
//     console.log(result);
//     if(result.length>0){
//         result.forEach(x=>{
//             var bot = new TelegramBot(x.bot_id);
//             bot.sendMessage(x.channel_id,x.description).then(res=>{
//                 db.SetMessageId(x.post_id,res.message_id);
//             });
//         })
//     }
//
   var SendingPosts =  await db.GetSendingPosts();

   if(SendingPosts.length>0) {
       SendingPosts.forEach(x => {

           var bot = new TelegramBot(x.bot_id);
           bot.sendMessage(x.channel_id, x.description,{
               parse_mode:"HTML"
           }).then(res => {
               db.SetMessageId(x.post_id, res.message_id);

           })
       })
   }

   var DeletingPosts = await db.GetDeletingPosts();

   if(DeletingPosts.length>0){
       DeletingPosts.forEach(x=>{
           var bot = new TelegramBot(x.bot_id);
           db.RemovePost(x.post_id).then(res=>{
               bot.deleteMessage(x.channel_id,x.message_id);
           });

       })
   }




},6000)



module.exports = router;