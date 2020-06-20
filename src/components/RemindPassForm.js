import React from "react";
import NamedInput from "./NamedInput";
import server from '../controllers/ServerController'
import User from "../models/User";
import Swal from "sweetalert2";

class RemindPassForm extends React.Component{

    constructor(props) {
        super(props);
        this.remind = this.remind.bind(this);
    }

    remind(){

       server.RemindPassword({email:this.email.state.value}).then(res=>{
           if(res[0].result===true){
               Swal.fire({
                   text:"Проверьте вашу почту для восстановления пароля",
                   title:"Успех!",
                   icon:"success"
               })
           }
           else{
               Swal.fire({
                   text:"Неправильно указана почта, проверьте пожалуйста еще раз",
                   title:"Ошибка!",
                   icon:"error"
               })
           }
       });

    }

    render() {
        return(
            <div className={'flex-column-container index form horizontal-center'} >
                <NamedInput ref={input=>{this.email = input}}  height={50} style={{min:8,max:30,required:true}}  label={"Email"} inputId={"email"} type={"email"} />
                <a href={"/login"} className={"little-margin-style"}>Войти в аккаунт</a>
                <button onClick={this.remind} className={'btn btn-primary little-margin-style'} type={'submit'}>Отправить</button>
            </div>
        );
    }
}

export default RemindPassForm;