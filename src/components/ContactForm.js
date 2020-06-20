import React from "react";
import NamedInput from "./NamedInput";
import server from '../controllers/ServerController'
import Mail from '../models/Mail'

class ContactForm extends React.Component{
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
    }

    send(e){


        server.Contact(new Mail(
           "",
            "mark8890@mail.ru",
            this.email.state.value,
            this.text.value
        ));
        //
       // this.nickname.state.value
       //  console.log(this.name.state.value);
       //  console.log(this.email.state.value);
        console.log(this.text.value);



    }

    OnSubmitHandler = (e)=>{
        e.preventDefault();
    }

    render() {
        return(
            [

                <form onSubmitCapture={this.OnSubmitHandler} className={"flex-column-container index form form-margin horizontal-center container horizontal-center"} onSubmit={this.send}>
                    <h1 className={"horizontal-center text-justify "}>Контакты</h1>
                    <NamedInput ref={input=>{this.email = input}}  height={50}  label={"Почта"} inputId={"theme"} type={"email"} />
                    <p className={"text-justify blockquote little-margin-style"}>Вопрос</p>
                    <textarea ref={input=>{this.text = input}} className={" form-control"}/>
                    <button className={'btn btn-primary little-margin-style'} type={'submit'}>Отправить</button>
                </form>
            ]

        )
    }

}

export default ContactForm;