import React from "react";
// eslint-disable-next-line no-unused-vars
import NamedInput from "../NamedInput";
import {Carousel} from "react-responsive-carousel";
import Swal from "sweetalert2";
import server from '../../controllers/ServerController'
// eslint-disable-next-line no-unused-vars
import sessionController from "../../controllers/SessionController";
import Post from "./Post";

class Channels extends React.Component{

    constructor(props) {
        super(props);
        this.AddChannel = this.AddChannel.bind(this);
        this.DeleteChannel = this.DeleteChannel.bind(this);
        this.state={
            channels:null,
            accounts:null
        }
    }

    componentDidMount() {

        server.GetChannels(JSON.parse(sessionController.ParseSessionInformation())).then(res=>{
            //console.log(res[0]);
            this.setState(()=>({
                channels:res
            }))
        })

        server.GetAccounts(JSON.parse(sessionController.ParseSessionInformation())).then(res=>{
            //console.log(res[0]);
            this.setState(()=>({
                accounts:res
            }))
        })

    }

    DeleteChannel(channel_id){

        Swal.fire({
            title: 'Вы точно хотите удалить канал?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да',
            cancelButtonText:'Нет'
        }).then((result) => {

            if (result.value) {

                server.RemoveChannel(channel_id).then(res=>{
                    server.GetChannels(JSON.parse(sessionController.ParseSessionInformation())).then(result=>{
                        this.setState(()=>({
                            channels:result
                        }))
                    })
                })

                Swal.fire({
                    title:"Ваш канал был удален!",
                    icon:"success"
                    }

                )
            }
        })


    }

    AddChannel(){


        console.log(this.state.accounts);
        //
        const arrayToObject = (array) =>
            array.reduce((obj, item) => {
                obj[item.account_id] = item.account_id
                return obj
            }, {})

        var channels = arrayToObject(this.state.accounts)

        // var inputOptions =  {
        //                   channel1: 'Аккаунт 1',
        //                   channel2: 'Аккаунт 2',
        //                   channel3: 'Аккаунт 3',
        //               }
        //
        //               console.log(inputOptions);

        Swal.mixin({
            confirmButtonText: 'Далее &rarr;',
            cancelButtonText: 'Отмена',
            showCancelButton: true,
            progressSteps: ['1', '2'],
            preConfirm: (UserInfo) => {
                // return fetch(`//api.github.com/users/${login}`)
                //     .then(response => {
                //         if (!response.ok) {
                //             throw new Error(response.statusText)
                //         }
                //         return response.json()
                //     })
                //     .catch(error => {
                //         Swal.showValidationMessage(
                //             `Request failed: ${error}`
                //         )
                //     })



            },
        }).queue([
            {
                input: 'select',
                inputOptions: channels,
                title: 'Выберите аккаунт',
            },
            {
                input:"text",
                animation: "slide-from-top",
                inputPlaceholder: "@",
                preConfirm: (inputValue) => {
                  console.log("preConfirm: "+ inputValue);

                  console.log(this.inputPlaceholder);

                },
                title: 'Введите название канала',
            },
        ]).then((result) => {
            if (result.value) {
                const answers = JSON.stringify(result.value)
                console.log(result.value[0])
                server.AddChannel(JSON.parse(sessionController.ParseSessionInformation()),result.value[0],result.value[1]).then(result=>{

                    server.GetChannels(JSON.parse(sessionController.ParseSessionInformation())).then(res=>{
                        console.log(JSON.stringify(res));
                        this.setState(()=>({
                            channels:res
                        }))
                    })

                })
      //           Swal.fire({
      //               title: 'All done!',
      //               html: `
      //               Your answers:
      //                <pre><code>${answers}</code></pre>
      // `,
      //               confirmButtonText: 'Готово!'
      //           })
            }
        })
    }

    render() {
        return (

            <div className={"container container-default-top-margin container-default-bottom-margin"}>
                <h1 className={"text-center mt-2"}>Каналы</h1>

                <div className={"sidepanel-main-channels-container container"}>


                    {/*{this.state.channels=== null ?*/}
                    {/*    <div>Loading</div>*/}
                    {/*    :*/}
                    {/*    this.state.channels.map((channel)=>{*/}
                    {/*        return(<div className={"sidepanel-content-container-channel-add mt-4 " }>*/}
                    {/*            {channel.channel_id}*/}
                    {/*        </div>)*/}
                    {/*    })*/}
                    {/*}*/}

                    {this.state.channels=== null ?
                        <div>Loading</div>
                        :
                        this.state.channels.map((channel)=>{
                            return(<Post id={channel.channel_id} header={"Канал: " + channel.channel_id} deleteEmmiter={this.DeleteChannel} account={"Аккаунт: "+ channel.account_id}/>)
                        })
                    }


                    <div className={"sidepanel-content-container-channel-add mt-4 " } onClick={this.AddChannel} >

                        <img className={"sidepanel-content-container-add-icon "}  src="/img/plus.png" />


                    </div>



                </div>




            </div>

    );
    }

}

export default Channels;