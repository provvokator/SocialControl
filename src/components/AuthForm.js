import React from 'react';
import NamedInput from "./NamedInput";
import server from '../controllers/ServerController'
import User from '../models/User'
import sessionController from '../controllers/SessionController'
import Swal from "sweetalert2";



class AuthForm extends React.Component{

    // eslint-disable-next-line no-useless-constructor
    constructor(props)
    {

        super(props);
        this.authorization = this.authorization.bind(this);

    }

    authorization(){

        // eslint-disable-next-line no-undef
        //server.Authorization(new User("",this.email.state.value,this.password.state.value))
        //sessionController.CreateSession(new User("",this.email.state.value,""));
        server.Authorization({user: new User("", this.email.state.value, this.password.state.value)}).then(res=>{

            if(res[0].result[0]!==undefined){
                console.log(res[0].result[0]);
                sessionController.CreateSession(res[0].result[0].token);
                window.location = '/manage';
                console.log(sessionController.ParseSessionInformation());
            }
            else{
                Swal.fire({
                    title:"Ошибка",
                    icon:"error",
                    text:"Неправильная почта или пароль!"
                })
            }


        });
        //console.log(JSON.parse(sessionController.ParseSessionInformation()));
        //console.log(this.props.children);
    }

    HandleEnterClick=(e)=>{
        if(e.key==="Enter"){
            this.authorization();
        }
    }

   render() {
       return(

           <div onKeyPress={this.HandleEnterClick} className={'flex-column-container index form horizontal-center form-margin container'}>
               <h1 className={"text-center mt-2"}>Вход</h1>
               <NamedInput ref={input=>{this.email = input}} placeholder={"Введите почту"} height={50}  label={"Почта"} inputId={"email"} type={"email"}/>
               <NamedInput ref={input=>{this.password = input}} placeholder={"Введите пароль"}  height={50} label={"Пароль"} inputId={"password"} type={"password"}/>
               <a href={"/register"} className={"little-margin-style"}>Не зарегистрированы? </a>
               <a href={"/remindpass"} className={"little-margin-style"}>Забыли пароль?</a>
               <button onClick={this.authorization} className={'btn btn-primary little-margin-style' } type={'submit'}>Войти</button>
           </div>
       )

   }

}

export default AuthForm