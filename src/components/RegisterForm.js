import React from "react";
import NamedInput from "./NamedInput";
import User from "../models/User"
import server from '../controllers/ServerController'
import RandomGenerator from '../controllers/RandomGeneratorController'
import Swal from 'sweetalert2';
import Mail from "../models/Mail";
import TemplateDataValidator from '../controllers/TemplateDataValidator'

class RegisterForm extends React.Component{

    // eslint-disable-next-line no-useless-constructor
    constructor(props)
    {
        super(props);
        this.register = this.register.bind(this);
    }




    register(){

        //Небольшой костыль, чтобы не сбивать событие OnEnter
        setTimeout(()=>{
            if(this.email.state.value===undefined||this.password.state.value===undefined|| this.passwordconfirm.state.value===undefined){
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                    text: 'Заполните все поля формы!',
                });
            }

            else{
                if(TemplateDataValidator.isEmailValid(this.email.state.value)===null){
                    Swal.fire({
                        icon: 'error',
                        title: 'Ошибка',
                        text: 'Некорректный email',
                    });
                }

                if(this.password.state.value.length<8){
                    Swal.fire({
                        icon: 'error',
                        title: 'Ошибка',
                        text: 'Пароль должен быть 8 символов и более!',
                    });
                }

                if(this.passwordconfirm.state.value!==this.password.state.value){
                    Swal.fire({
                        icon: 'error',
                        title: 'Ошибка',
                        text: 'Пароли не совпадают!',
                    });
                }



                if(this.passwordconfirm.state.value===this.password.state.value&&this.password.state.value.length>=8&&TemplateDataValidator.isEmailValid(this.email.state.value)!==null){
                    const AcessCode = RandomGenerator.AcessCodeGenerate();
                    var user = new User("",this.email.state.value,this.password.state.value,AcessCode,null,Date.now(),RandomGenerator.TokenGenerate());

                    server.Registration({user: user}).then(res=> {
                        console.log(res[0].result);
                        if (res[0].result){
                            Swal.fire({
                                icon: 'success',
                                title: 'Вы зарегистрированы!',
                                text: 'Перейдите на почту, чтобы подтвердить свой аккаунт',
                            });


                            //ИСПРАВЬ!!!!! //Добавь ссылку
                            server.Confirm(new Mail(
                                "",
                                this.email.state.value,
                                "Подтвердите свой email",
                                `${window.location.hostname}/verify/${AcessCode}`
                            ));

                            this.Clear();

                        }
                        else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Ошибка',
                                text: 'Данный email уже зарегистрирован!',
                            })
                        }
                    });

                }
            }
        },1)



    }


    HandleEnterClick=(e)=>{
        if(e.key==="Enter"){
            this.register();
        }
    }

    Clear = ()=>{
        this.email.setState(()=>({
            value:""
        }))

        this.password.setState(()=>({
            value:""
        }))

        this.passwordconfirm.setState(()=>({
            value:""
        }))
    }


    render() {
        return(
            <div onKeyDown={this.HandleEnterClick} className={'flex-column-container index form horizontal-center form-margin container'}>
                <h1 className={"text-center mt-2"}>Регистрация</h1>
                <NamedInput ref={input=>{this.email = input}} placeholder={"Введите почту"} height={50} style={{min:8,max:30,required:true}}  label={"Почта"} inputId={"email"} type={"email"} />
                <NamedInput ref={input=>{this.password = input}} placeholder={"Пароль"}  height={50} style={{min:8,max:30,required:true}} label={"Пароль"} inputId={"password"} type={"password"}/>
                <NamedInput ref={input=>{this.passwordconfirm = input}} placeholder={"Подтверждение пароля"}   height={50} style={{min:8,max:30,required:true}} label={"Подтверждение пароля"}  inputId={"confirm"} type={"password"}/>
                <a href={"/login"} className={"little-margin-style"}>Уже зарегистрированы?</a>
                <button onClick={this.register}  className={'btn btn-primary little-margin-style'} type={'submit'}>Зарегистрировать</button>
            </div>

        )

    }

}

export default RegisterForm