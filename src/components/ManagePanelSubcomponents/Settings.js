import React from "react";
import NamedInput from "../NamedInput";
import server from '../../controllers/ServerController'
import sessionController from '../../controllers/SessionController'
import Swal from "sweetalert2";

class Settings extends React.Component{

    constructor(props) {
        super(props);
        this.GetUserInfo = this.GetUserInfo.bind(this);
        this.ChangeNickname = this.ChangeNickname.bind(this);
        this.ChangePassword = this.ChangePassword.bind(this);

        // this.state = {
        //     nickname:"3"
        // }
    }

    componentDidMount() {

        server.GetUserData(JSON.parse(sessionController.ParseSessionInformation())).then(res=> {

            this.nickname.setState(()=>({
                value:res[0].result[0].nickname
            }))

        })
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

    }



    GetUserInfo(){

    }

    ChangePassword(){


        if (this.newpassword.state.value===this.confirmpassword.state.value){

            server.ChangePassword(JSON.parse(sessionController.ParseSessionInformation()),this.currentpassword.state.value,this.confirmpassword.state.value).then(res=>{
                if(res.result===true){
                    Swal.fire({
                        title:"Успех!",
                        icon:"success",
                        text:"Ваш пароль изменен!"
                    })
                }
                else{
                    Swal.fire({
                        title:"Ошибка",
                        icon:"error",
                        text:"Неверный текущий пароль!"
                    })
                }
            })

        }
        else{

            Swal.fire({
                title:"Ошибка",
                icon:"error",
                text:"Пароли не совпадают!"
            })

        }

    }

    ChangeNickname(){
        console.log(this.nickname.state.value);
        server.ChangeNickname(JSON.parse(sessionController.ParseSessionInformation()),this.nickname.state.value).then(res=>{
            this.nickname.setState(()=>({
                value:this.nickname.state.value
            }))
        });


    }

    render() {

        return([
            <div className={"container container-default-top-margin container-default-bottom-margin"}>
                <h1 className={"text-center mt-2"}>Настройки</h1>
                <div className={"sidepanel-content-container mt-4 "}>

                    <NamedInput ref={input=>{this.nickname = input}}  height={50} label={"Никнейм"}  type={"text"}/>
                    <button onClick={this.ChangeNickname} className={'btn btn-warning little-margin-style w-100 text-light' } type={'submit'}>Изменить</button>
                </div>

                <div className={"sidepanel-content-container mt-4 "}>
                        <h2 className={"text-center text-uppercase blockquote little-margin-style"}>Сменить пароль</h2>
                    <NamedInput ref={input=>{this.currentpassword = input}}  height={50} label={"Текущий пароль"}  type={"password"}/>
                    <NamedInput ref={input=>{this.newpassword = input}}  height={50} label={"Новый пароль"}  type={"password"}/>
                    <NamedInput ref={input=>{this.confirmpassword = input}}  height={50} label={"Потвердить пароль"}  type={"password"}/>
                         <button onClick={this.ChangePassword} className={'btn btn-warning little-margin-style w-100 text-light' } type={'submit'}>Изменить</button>
                </div>





            </div>
        ])

    }

}

export default Settings;