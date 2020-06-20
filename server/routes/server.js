var express = require('express');
var router = express.Router();
var db = require('../controllers/Database');

var mailController = require('../controllers/MailController');
var Mail = require('../models/Mail');

var cryptographer = require('../controllers/cryptographer');
const TelegramBot = require('node-telegram-bot-api');



/* GET home page. */
router.post('/registration', function(req, res, next) {

   db.registration(req.body).then(result=>{

       res.json([
           { result:result},
       ]);


   });
});

router.post('/remind',function (req,res,next) {

    db.RemindPassword(req.body.email).then(result=>{
        if(result[0]!==undefined)
        {
            mailController.Send(new Mail("telegrampostnotify@gmail.com",result[0].email,"Восстановление пароля",`Ваш пароль:${result[0].password}`));
            res.json([
                { result:true},
            ]);
        }
        else{
            res.json([
                { result:false},
            ]);
        }

    })

});

router.post('/verify/:code',function (req,res) {

    db.Verify(req.params.code).then(result=>{

        res.json([
            { result:result},
        ]);

    });
});



router.post('/question',function (req,res,next) {

    mailController.Send(new Mail('youremail@gmail.com','mark.mark8890@mail.ru',req.body.subject,req.body.text+";" + new Date().toString(),req.body.html));
});

router.post('/confirm',function (req,res) {


    mailController.Send(new Mail("telegrampostnotify@gmail.com",req.body.to,req.body.subject,req.body.text));

});

router.post('/authorization', function(req, res, next) {

    db.authorization(req.body).then(answer=>{

        if(answer[0]!==undefined){

            answer[0].email = cryptographer.encrypt(answer[0].email);
            answer[0].password = cryptographer.encrypt(answer[0].password);
            answer[0].nickname = cryptographer.encrypt(answer[0].nickname);

        }

        // answer[0] = answer[0].map(x=>cryptographer.encrypt(x));

        res.json([
            { result:answer},
        ]);
    });

});

router.post('/getuser',function (req,res,next) {


    db.GetUser(req.body.token).then(answer=>{
        res.json([
            { result:answer},
        ]);
    })

});

router.post('/changenickname',function (req,res,next) {


    db.ChangeNickname(req.body.token,req.body.nickname);

})



router.post('/newpassword',function (req,res) {

    db.ChangePassword(req.body.token,req.body.currentPassword,req.body.newPassword).then(answer=>{
        res.json(
            { result:answer},
        );
    })


})



router.post('/alluserinfo',function (req,res) {

    db.GetAllUserInfo(req.body.token).then(answer=>{
        res.json(
            {result:answer}
        )
    })



})

router.post('/accounts',function (req,res) {

    db.GetAccounts(req.body.token).then(answer=>{
        res.json(answer);
    })

})

router.post('/channels',function (req,res) {

    db.GetChannels(req.body.token).then(answer=>{
        res.json(answer);
    })

})

router.post('/addchannel',function (req,res) {

    db.AddChannel(req.body.token,req.body.account_id,req.body.channel_id).then(answer=>{
        res.json(answer);
    })

})

router.post('/getposts',function (req,res) {

    db.GetPosts(req.body.token).then(answer=>{
        res.json(answer);
    })

})

router.post('/getpost',function (req,res) {

    db.GetPost(req.body.post_id).then(answer=>{
        res.json(answer);
    })

})

router.post('/addpost',function (req,res) {
    db.AddPost(req.body.post).then(answer=>{
        res.json( {result:answer})
    })

})

router.post('/removepost',async function (req,res) {

    let post = await db.GetPost(req.body.post_id);

    let BotToken = await db.GetUserBotToken(req.cookies["session"]);

    let bot = new TelegramBot(BotToken[0].bot_id);

    db.RemovePost(req.body.post_id).then(answer=>{

        if(post[0].message_id!==null){
            bot.deleteMessage(post[0].channel_id,post[0].message_id);
        }
        res.json( {result:answer})

    })

})

router.post('/changepost',async function (req,res) {

    let ChangeRes = await db.ChangePost(req.body.post);

    let BotToken = await db.GetUserBotToken(req.cookies["session"]);

    let GetPost = await db.GetPost(req.body.post.post_id)


    let bot = new TelegramBot(BotToken[0].bot_id);

    console.log("CHANGE!!!!!!!!!!!!!!!!!!!!!")
    console.log(req.body.post.post_id);
    console.log(req.body.post.channel_id.value)
    console.log(req.body.post.post_id);
    console.log(req.body.post)


    let editRes = await bot.editMessageText(req.body.post.description,{
        message_id:parseInt(GetPost[0].message_id),
        chat_id:req.body.post.channel_id.value,
        parse_mode:"HTML"
    })

    await res.json({result: ChangeRes})

})

router.post('/removechannel',function (req,res) {

    db.RemoveChannel(req.body.channel_id).then(answer=>{
        res.json( {result:answer})
    })

})

router.post('/removeaccount',function (req,res) {

    db.RemoveAccount(req.body.account_id).then(answer=>{
        res.json( {result:answer})
    })

})




module.exports = router;
