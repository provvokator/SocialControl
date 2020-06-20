import React from "react";
import NamedInput from "../NamedInput";
import Swal from "sweetalert2";
import server from '../../controllers/ServerController'
import TemplateDataValidator from '../../controllers/TemplateDataValidator'
// eslint-disable-next-line no-unused-vars
import "../../styles/index.css";
import sessionController from "../../controllers/SessionController";
import Accounts from "./Accounts";
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select'
import TimeController from "../../controllers/TimeController";
import Droppable from "react-drag-and-drop/lib/Droppable";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

//

class AddPost extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id:null,
            date: new Date(),
            header:"",
            accounts:"",
            channels:"",
            text:null,
            prevText:null,
            currentChannel:null,
            currentAccount:null,
        }
        this.createPost = this.createPost.bind(this);
        this.onSetDate = this.onSetDate.bind(this);
        this.GetPostValues = this.GetPostValues.bind(this);
    }




    onSetDate(date){
        let now = new Date();
        if(date<now){
            this.setState(()=>({
                date:now
            }))
        }
        else{
            this.setState({ date })
        }

    }

    clear(){
        this.header.setState(()=>({
            value:""
        }))

        this.setState(()=>({
            text:null
        }))


    }



    async createPost(){
        console.log(this.state.text);
        if(this.state.currentAccount!==null&&this.state.currentChannel!==null&& this.header.state.value!==undefined){
            let resultDate = null;
            console.log(this.state.date);
            let timezone = await TimeController.GetCurretUserLocationInfo().timezone;
            if(this.state.date<new Date()){
                resultDate = new Date(this.state.date);
                resultDate.toLocaleString("en-US", {timeZone: timezone});
                resultDate = new Date(resultDate)
                resultDate.setMinutes(resultDate.getMinutes()+1);
                resultDate.setHours(resultDate.getHours()+ TimeController.GetOffset(resultDate));
            }
            else{
                resultDate = new Date(this.state.date);
                resultDate.toLocaleString("en-US", {timeZone: timezone});
                resultDate = new Date(resultDate)
                resultDate.setHours(resultDate.getHours()+ TimeController.GetOffset(resultDate));
            }

            let delete_time = null;

            if(this.deletetime.state.value!==undefined){
                delete_time = new Date(resultDate);
                let offsetTime = parseInt(this.deletetime.state.value);
                delete_time.setHours(delete_time.getHours()+ offsetTime);
                delete_time = TemplateDataValidator.StandartDateToSqlDate(delete_time);
            }


            if(this.state.id==null){
                server.AddPost({
                    channel_id:this.state.currentChannel,
                    account_id:this.state.currentAccount,
                    sending_time:TemplateDataValidator.StandartDateToSqlDate(resultDate),
                    title:this.header.state.value||"",
                    description:this.state.text||"",
                    delete_time:delete_time
                })
            }
            else{
                server.ChangePost({
                    post_id:this.state.id,
                    channel_id:this.state.currentChannel,
                    account_id:this.state.currentAccount,
                    sending_time:TemplateDataValidator.StandartDateToSqlDate(resultDate),
                    title:this.header.state.value||"",
                    description:this.state.text||"",
                    delete_time:delete_time
                })
            }

            this.clear();

            //Анимация загрузки, подключи CSS!
        //     Swal.fire({
        //         customClass: {
        //             popup: 'hide',
        //         },
        //         showConfirmButton:false,
        //         html:'<div class="d-flex flex-row justify-content-center">' +
        //             '<span class="loader "></span>' +
        //             '<div>'
        //     })
        //     await fetch(request.url,{
        //         method: 'POST',
        //         body:FormValue
        //     })
        //     Swal.close();
        //
        //
        //
        //     Swal.fire({
        //         title: 'Ваша заявка успешно отправлена',
        //         text: 'Поздравляю!',
        //         icon: 'success',
        //         confirmButtonText: 'Отлично!',
        //         confirmButtonColor:'#FFC000'
        //     });
        //
        // }

            Swal.fire({
                title:"Успех!",
                text:"Пост успешно добавлен",
                icon:"success"
            }).then(res=>{
                if(res.value){
                    window.location = "/manage/posts";
                }
            })
        }
        else{
            Swal.fire({
                title:"Ошибка!",
                text:"Все поля должны быть заполнены!",
                icon:"error"
            })
        }


    }

    async GetPostValues(post_id){
        var res = await server.GetPost(post_id);

        console.log("Params: " +this.props.match.params.id);
        if(this.props.match.params.id==null){

            this.setState(()=>({
                date:new Date()
            }))
        }
        else{

            var SendingTime = new Date(res[0].sending_time);
            console.log(new Date(SendingTime))
            this.setState(()=>({
                date:new Date(SendingTime)
            }))

            console.log(this.state.date);
        }

        this.header.setState(()=>({
            value:res[0].title
        }))

        this.setState(()=>({
            prevText:res[0].description,
            text:res[0].description
        }))

        this.setState(()=>({
            currentChannel:{value:res[0].channel_id,label:res[0].channel_id},
            currentAccount:{value:res[0].account_id,label:res[0].account_id}

        }))

        let DeleteMs = new Date(res[0].delete_time).getTime();
        let SendMs = new Date(res[0].sending_time).getTime();
        if(DeleteMs>0){
            this.deletetime.setState(()=>({
                value:TimeController.MillisecondsToHours(DeleteMs-SendMs)
            }))
        }



    }

    componentDidMount() {

        if(this.props.match.params.id!==undefined){
            this.GetPostValues(this.props.match.params.id);
        }

        this.setState(()=>({
            id:this.props.match.params.id
        }))

        server.GetAccounts(JSON.parse(sessionController.ParseSessionInformation())).then(res=>{
            this.setState(()=>({
                accounts:TemplateDataValidator.AccountsToProperties(res)
            }))
        })



    }

    AccountChange = selectedOption => {
        server.GetChannels(JSON.parse(sessionController.ParseSessionInformation())).then(res=>{
            this.setState(()=>({
                channels:TemplateDataValidator.ChannelsToProperties(res.filter(x=>x.account_id===selectedOption.label)),
                currentAccount:selectedOption.label
            }))
        })
    };

    ChannelChange = selectedOption => {
        console.log( selectedOption);
        server.GetChannels(JSON.parse(sessionController.ParseSessionInformation())).then(res=>{
            this.setState(()=>({
                currentChannel:selectedOption.label
            }))
        })
    };

    onDrop(data) {
        console.log(data)
        // => banana
    }



    render(){

        return([
            <div className={"container container-default-top-margin container-default-bottom-margin"}>


                {this.state.id==null?
                    <h1 className={"text-center little-margin-style"}>Добавить пост</h1>:
                    <h1 className={"text-center mt-2"}>Изменить пост</h1>
                }



                <div className={"d-flex flex-column create-post-container mt-4 horizontal-center "}>

                    {this.state.id==null?
                        <div>
                            <label className={"label label-default"}>Аккаунты</label>
                            <Select onChange={this.AccountChange} className={"mt-1 z-index-for-subcomponents"} options={this.state.accounts} />

                            <label className={"mt-3 "}>Каналы</label>
                            <Select onChange={this.ChannelChange} className={"mt-1 z-index-for-main"} options={this.state.channels} />
                        </div>:
                        <div>

                            <label className={"label label-default"}>Аккаунты</label>
                            <Select onChange={this.AccountChange} className={"mt-1 z-index-for-subcomponents"} options={this.state.accounts} value={this.state.currentAccount}   />

                            <label className={"mt-3"}>Каналы</label>
                            <Select onChange={this.ChannelChange} className={"mt-1 z-index-for-main"} options={this.state.channels} value={this.state.currentChannel}  />


                        </div>
                    }




                    <label className={"mt-3"}>Дата</label>
                    <DateTimePicker  className={"mt-4 z-index-for-subcomponents"}
                                     onChange={this.onSetDate}
                                     value={this.state.date}
                                     hourPlaceholder={true}
                                     calendarAriaLabel={false}
                                     minDate={new Date()}

                    />



                    <NamedInput className={"md-2 mt-3 little-margin-style"} ref={input=>{this.header = input}} onChage={this.send} height={38}  label={"Заголовок"} inputId={"theme"} type={"email"} />

                    {/*<NamedTextArea height={38} ref={input=>{this.text = input}}  label={"Текст"} height={70} inputId={"theme"} type={"email"}/>*/}

                    <label className={"mt-3"}>Текст</label>
                    <CKEditor
                        className={"mt-3 "}
                        editor={ ClassicEditor }
                        data={this.state.prevText}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            //console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log(this.state.text);
                            if(data.length<1){
                                this.setState(()=>({
                                    text:null,
                                }))
                            }
                            else{
                                this.setState(()=>({
                                    text:TemplateDataValidator.BotSendTextFormat(data),
                                }))
                            }

                        } }
                        onBlur={ ( event, editor ) => {
                            //console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            //console.log( 'Focus.', editor );
                        } }
                        config={ {

                            toolbar: ["Bold","Italic", 'link','Strike','Undo','redo'],
                            model: 'normal', view: 'span', title: 'normal',
                            attributes: {
                                style: ' margin-top: 20px',
                            }

                        } }

                    />

                    {/*<div>*/}
                    {/*    <ul>*/}
                    {/*        /!*<Draggable type="fruit" data="banana"><li>Banana</li></Draggable>*!/*/}
                    {/*        /!*<Draggable type="fruit" data="apple"><li>Apple</li></Draggable>*!/*/}
                    {/*        /!*<Draggable type="metal" data="silver"><li>Silver</li></Draggable>*!/*/}
                    {/*    </ul>*/}
                    {/*    <Droppable*/}
                    {/*        types={['fruit']} // <= allowed drop types*/}
                    {/*        onDrop={this.onDrop.bind(this)}>*/}
                    {/*        <ul className="Smoothie"></ul>*/}
                    {/*    </Droppable>*/}
                    {/*</div>*/}

                    {/*<div className={"d-flex align-items-center mt-2 justify-content-between"}>*/}


                    {/*    <div className="form-check d-flex align-items-center justify-content-between">*/}
                    {/*            <input type="checkbox" className="form-check-input" id="AutoDeleteCheck"/>*/}
                    {/*            <label className="form-check-label" htmlFor="AutoDeleteCheck">Автоудаление</label>*/}


                    {/*        <div className={"hide-style-component right-align"}>*/}
                    {/*        <NamedInput ref={input=>{this.deletetime = input}} label={"Кол-во часов"} type={"number"} height={38} width={150}/>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*</div>*/}

                    <NamedInput ref={input=>{this.deletetime = input}} min={1} onKeyPress={(event)=>{return event.charCode>=48 && event.charCode<=57}} label={"Автоудаление через"} type={"number"} height={38} width={150}/>



                    {this.state.id==null?
                        <button onClick={this.createPost}  className={'btn btn-primary little-margin-style'} type={'submit'}>Добавить</button>:
                        <button onClick={this.createPost}  className={'btn btn-primary little-margin-style'} type={'submit'}>Изменить</button>
                    }


                </div>
            </div>
        ])

    }

}

export default AddPost;