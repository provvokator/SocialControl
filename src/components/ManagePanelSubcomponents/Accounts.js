import React  from "react";
import NamedInput from "../NamedInput";
import Swal from "sweetalert2";
import server from "../../controllers/ServerController";
import sessionController from "../../controllers/SessionController";
import Post from "./Post";


class Accounts extends React.Component{

    constructor(props) {
        super(props);
        this.AddAccount = this.AddAccount.bind(this);
        this.state = {
           accounts: null
        };
        this.DeleteAccount = this.DeleteAccount.bind(this);
    }

    componentDidMount() {

        server.GetAccounts(JSON.parse(sessionController.ParseSessionInformation())).then(res=>{
            console.log(JSON.stringify(res));
            this.setState(()=>({
                accounts:res
            }))
        })


    }



    AddAccount(){

        Swal.fire({
            title: '<h4>Добавление аккаунта</h4>',
            text:'Для того, чтобы добавить аккаунт, напишите боту команду /start, после чего следуйте инструкции',
            height:"400px",
            theme:"Borderless",
            width:"400px",
            showCloseButton:true,
            confirmButtonText: 'Перейти к боту &rarr;',
            preConfirm() {
                window.location = 'https://t.me/SocialChannelsControl_bot';
            }
        })

    }

    DeleteAccount(account_id){

        Swal.fire({
            title: 'Вы точно хотите удалить аккаунт?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:"Нет",
            confirmButtonText: 'Да'
        }).then((result) => {
            if (result.value) {
                server.RemoveAccount(account_id).then(res=>{
                    server.GetAccounts(JSON.parse(sessionController.ParseSessionInformation())).then(result=>{
                        this.setState(()=>({
                            accounts:result
                        }))
                    })
                })
                Swal.fire({
                    text:"Ваш аккаунт был удален!",
                    icon:"success"
                }

                )
            }
        })


    }

    render() {

        return([
            <div className={"container container-default-top-margin container-default-bottom-margin"}>

                <h1 className={"text-center mt-2"}>Аккаунты</h1>

                <div className={"sidepanel-main-channels-container container"}>

                    {/*{this.state.accounts=== null ?*/}
                    {/*    <div>Loading</div>*/}
                    {/*    :*/}
                    {/*    this.state.accounts.map((account)=>{*/}
                    {/*        return(<div className={"sidepanel-content-container-channel-add mt-4 " }>*/}
                    {/*            {account.account_id}*/}
                    {/*        </div>)*/}
                    {/*    })*/}
                    {/*}*/}

                    {this.state.accounts=== null ?
                        <div>Loading</div>
                        :
                        this.state.accounts.map((account)=>{
                            return(<Post id={account.account_id} deleteEmmiter={this.DeleteAccount} account={"Аккаунт: "+ account.account_id}  />)
                        })
                    }

                    <div className={"sidepanel-content-container-channel-add mt-4 " } onClick={this.AddAccount} >

                        <img className={"sidepanel-content-container-add-icon "}  src="/img/plus.png" />


                    </div>


                </div  >


            </div>
        ])

    }

}

export default Accounts;