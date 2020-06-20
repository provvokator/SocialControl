const dbconfig = require('../config/dbconfig');
var mysql = require('mysql2');
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
        this.connection.connect(function(err) {
         if (err) throw err;
         console.log("Connected!");

        });
    }

    registration(user){

        return new Promise(resolve => { var sql = `INSERT INTO users (user_id,email,nickname,password,registration_date,isVerified,verifiedCode,token) VALUES (null,'${user.email}','${user.username}','${user.password}',NOW(),'${user.isVerified}','${user.confirmationCode}','${user.token}')`;
            this.connection.execute(
                sql,
                function (err,result) {
                    console.log("ERROR: "+err);

                    //Проверка на ошибки при регистрации - если пользователь уже существует - вернет false, если нет - true
                    if( "null"===String(err)){
                        resolve(true);
                    }

                    resolve(false);



                }
            )})

    }

    authorization(user){
        return new Promise(resolve => {
            var sql = `SELECT * FROM users WHERE email='${user.email}' AND password = '${user.password}'`;
            this.connection.execute(sql,function (err,res) {

                Object.keys(res).length>0?resolve(res):resolve({});
            })
        })
    }

    RemindPassword(email){
        return new Promise(resolve => {
            var sql = `SELECT * FROM users WHERE email='${email}'`;
            this.connection.execute(sql,function (err,res) {
                Object.keys(res).length>0?resolve(res):resolve({});
            })
        })
    }

    Verify(verifyCode){
        return new Promise(resolve => {
            var sql = `UPDATE users SET isVerified=1 WHERE verifiedCode='${verifyCode}'`;

            this.connection.execute(
                sql,
                function (err,result) {

                    console.log("VerifyError: " + err);
                    //Проверка на ошибки при регистрации - если пользователь уже существует - вернет false, если нет - true
                    if( "null"===String(err)){
                        resolve(true);
                    }

                    resolve(false);



                }
            )})


    }

    GetUser(token){
        return new Promise(resolve => {
            var sql = `SELECT * From users WHERE token='${token}'`;
            this.connection.execute(sql,function (err,res) {
                Object.keys(res).length>0?resolve(res):resolve({});
            })
        })
    }

    ChangeNickname(token,nickname){
        var sql = `UPDATE users SET nickname='${nickname}' where token='${token}'`;
        this.connection.execute(sql,function (err,res) {
                console.log("Change Nickname error");
                console.log(err);
        })
    }

    ChangePassword(token,currentPassword,newPassword){
        return new Promise(resolve => {
            var sql = `Update users set password='${newPassword}' where password='${currentPassword}' and token='${token}'`;
            this.connection.execute(sql,function (err,res) {

                console.log(res);
                if( "null"===String(err)&&res.changedRows>0){
                    resolve(true);
                }


                resolve(false);
            })

        })
    }

    AddAccount(user_id,email){
        return new Promise(resolve => {
            var sql = `INSERT INTO accounts SET account_id='${user_id}',user_id = (SELECT user_id FROM users WHERE email='${email}')`;
            this.connection.execute(sql,function (err,res) {

                console.log(err);
                if( "null"===String(err)){
                    resolve("success");
                }
                else{
                    if(err.code === "ER_DUP_ENTRY"){
                        resolve("already exist")
                    }

                    resolve("not exist");
                }



            })
        })
    }

    AddBot(bot_id,account_id){
        return new Promise(resolve => {
            var sql=`UPDATE accounts SET bot_id='${bot_id}' where account_id='${account_id}'`;
            this.connection.execute(sql,function (err,res) {

                console.log(err);
                if( "null"===String(err)){
                    resolve("success");
                }
                else{
                    if(err.code === "ER_DUP_ENTRY"){
                        resolve("already exist")
                    }

                    resolve("not exist");
                }



            })

        })
    }

    // GetUserChannels(token){
    //     return new Promise()
    // }
    GetAllUserInfo(token){
        return new Promise(resolve => {
            var sql = `SELECT * FROM (
            (users INNER JOIN accounts ON users.user_id =
            accounts.user_id) INNER JOIN channel ON channel.account_id =
            accounts.account_id
            INNER JOIN posts ON posts.channel_id=channel.channel_id
            ) WHERE users.token='${token}'`;

            this.connection.execute(
                sql,
                function (err,result) {


                    //Проверка на ошибки при регистрации - если пользователь уже существует - вернет false, если нет - true

                  

                    // var obj = {
                    //     account_id: "@PROVVOKATOR"
                    //     bot_id: "1231387942:AAGznkf78s02VJBirLtwYqsDHdMpUIdlqXA"
                    //     channel_id: "SomeChannel"
                    //     description: "bbbb"
                    //     email: "play8892@gmail.com"
                    //     isVerified: 0
                    //     nickname: "Mark"
                    //     password: "123123123"
                    //     post_id: 1
                    //     registration_date: "2020-04-17T07:27:41.000Z"
                    //     sending_time: "2020-04-27T16:46:19.000Z"
                    //     title: "lalala"
                    //     token: "szr4ozxbbr2za832"
                    //     user_id: 1
                    //     verifiedCode: "afyn0a092g4j77tg"
                    // }

                    if( "null"===String(err)){
                        resolve(result);
                    }

                    resolve(err);



                }
            )

        })
    }

    GetAccounts(token){
        return new Promise(resolve => {
            var sql = `SELECT * FROM accounts WHERE user_id=(SELECT user_id FROM users WHERE token ='${token}')`;

            this.connection.execute(
                sql,
                function (err,result) {

                    if( "null"===String(err)){
                        resolve(result);
                    }

                    resolve(err);

                }
            )

        })
    }

    GetChannels(token){

        return new Promise(resolve => {
            var sql = `SELECT * from channel WHERE user_id=(SELECT user_id FROM users WHERE token='${token}')`;

            this.connection.execute(
                sql,
                function (err,result) {

                    console.log(result);

                    if( "null"===String(err)){
                        resolve(result);
                    }

                    resolve(err);



                }
            )

        })

    }

    AddChannel(token,account_id,channel_id){
        return new Promise(resolve => {
            var sql = `INSERT INTO channel SET account_id='${account_id}',channel_id='${channel_id}',user_id = (SELECT user_id FROM users WHERE token='${token}')`;

            this.connection.execute(
                sql,
                function (err,result) {

                    console.log(result);

                    if( "null"===String(err)){
                        resolve(true);
                    }

                    resolve(err);



                }
            )

        })
    }

    GetPosts(token){
        return new Promise(resolve => {
            var sql = `SELECT * FROM posts WHERE account_id=(SELECT account_id FROM accounts WHERE accounts.user_id=(SELECT user_id from users WHERE token='${token}'))`;

            this.connection.execute(
                sql,
                function (err,result) {

                    console.log(result);

                    if( "null"===String(err)){
                        resolve(result);
                    }

                    resolve(err);



                }
            )

        })
    }

    GetPost(post_id){
        return new Promise(resolve => {
            var sql = `SELECT * FROM posts WHERE post_id='${post_id}'`;

            this.connection.execute(
                sql,
                function (err,result) {

                    console.log(result);

                    if( "null"===String(err)){
                        resolve(result);
                    }

                    resolve(err);



                }
            )

        })
    }

    GetSendingPosts(){
        return new Promise(resolve => {
            var sql = `SELECT * FROM (posts INNER JOIN accounts ON accounts.account_id = posts.account_id) WHERE (now()-sending_time) BETWEEN -3 AND 2`;

            this.connection.execute(
                sql,
                function (err,result) {

                    console.log(result);

                    if( "null"===String(err)){
                        resolve(result);
                    }

                    resolve(err);



                }
            )

        })
    }

    GetDeletingPosts(){
        return new Promise(resolve => {
            var sql = `SELECT * FROM (posts INNER JOIN accounts ON accounts.account_id = posts.account_id) WHERE (now()-delete_time) BETWEEN -3 AND 3`;

            this.connection.execute(
                sql,
                function (err,result) {

                    console.log(result);

                    if( "null"===String(err)){
                        resolve(result);
                    }

                    resolve(err);



                }
            )

        })
    }

    AddPost(post){
        return new Promise(resolve => {
            var sql = `INSERT INTO posts(post_id,channel_id,account_id,title,description,sending_time,delete_time) values(null,'${post.channel_id}','${post.account_id}','${post.title}','${post.description}','${post.sending_time}','${post.delete_time}')`;

            this.connection.execute(
                sql,
                function (err,result) {
                    console.log(err);
                    if( "null"===String(err)){
                        resolve(true);
                    }

                    resolve(false);



                }
            )

        })
    }

    ChangePost(post){
        return new Promise(resolve => {
            var sql = `UPDATE posts SET title='${post.title}',description='${post.description}',sending_time='${post.sending_time}',delete_time='${post.delete_time}' WHERE post_id='${post.post_id}'`;
            this.connection.execute(
                sql,
                function (err,result) {
                    console.log(err);
                    if( "null"===String(err)){
                        resolve(true);
                    }

                    resolve(false);



                }
            )

        })
    }



    RemoveChannel(channel_id){
        return new Promise(resolve => {
            var sql = `DELETE FROM channel where channel_id='${channel_id}'`;

            this.connection.execute(
                sql,
                function (err,result) {
                    console.log(err);
                    if( "null"===String(err)){
                        resolve(true);
                    }

                    resolve(false);



                }
            )

        })
    }

    RemoveAccount(account_id){
        return new Promise(resolve => {
            var sql = `DELETE FROM accounts where account_id='${account_id}'`;

            this.connection.execute(
                sql,
                function (err,result) {
                    console.log(err);
                    if( "null"===String(err)){
                        resolve(true);
                    }

                    resolve(false);



                }
            )

        })
    }

    RemovePost(post_id){
        return new Promise(resolve => {
            var sql = `DELETE FROM posts where post_id='${post_id}'`;

            this.connection.execute(
                sql,
                function (err,result) {
                    console.log(err);
                    if( "null"===String(err)){
                        resolve(true);
                    }

                    resolve(false);



                }
            )

        })
    }

    GetUserBotToken(token){

        return new Promise(resolve => {
            var sql = `select bot_id from accounts where user_id=(select user_id from users where token='${token}')`;

            this.connection.execute(
                sql,
                function (err,result) {
                    console.log(err);
                    if( "null"===String(err)){
                        resolve(result);
                    }

                    resolve(null);



                }
            )

        })

    }

    GetPost(post_id){
        return new Promise(resolve => {
            var sql = `SELECT * FROM (posts INNER JOIN accounts ON accounts.account_id = posts.account_id) where post_id='${post_id}'`;

            this.connection.execute(
                sql,
                function (err,result) {
                    console.log(err);
                    if( "null"===String(err)){
                        resolve(result);
                    }

                    resolve(null);



                }
            )

        })
    }

    SetMessageId(post_id,message_id){

        return new Promise(resolve => {
            var sql = `UPDATE posts SET message_id='${message_id}' where post_id='${post_id}'`;

            this.connection.execute(
                sql,
                function (err,result) {
                    console.log(err);
                    if( "null"===String(err)){
                        resolve(true);
                    }

                    resolve(false);



                }
            )

        })

    }
}


//РАСКОМЕНТИРУЙ БЛЕТБ!!!!

var db = new Database(dbconfig);
module.exports = db;