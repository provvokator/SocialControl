import React from "react";
// eslint-disable-next-line no-unused-vars
import NamedInput from "../NamedInput";
import {Carousel} from "react-responsive-carousel";
import Swal from "sweetalert2";
import server from '../../controllers/ServerController'
// eslint-disable-next-line no-unused-vars
import sessionController from "../../controllers/SessionController";
import Post from "./Post";
import '../../styles/Post.css'
import PostsDateValidator from "../../controllers/PostsDateValidator";

class Posts extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            posts:null
        }
        this.Update = this.Update.bind(this)
        this.GetPosts = this.GetPosts.bind(this);
        this.DeletePost = this.DeletePost.bind(this);
        this.SettingsEmmiter = this.SettingsEmmiter.bind(this);
    }

    componentDidMount() {

        this.GetPosts();


    }

    Update(){
        this.forceUpdate();
    }

    GetPosts(){
        server.GetPosts(JSON.parse(sessionController.ParseSessionInformation())).then(res=>{


            console.log(PostsDateValidator.DividePostsToMonths({collection: PostsDateValidator.PostsDatesAssendingSort(res)}));
            this.setState(()=>({
                posts:PostsDateValidator.DividePostsToMonths({collection: PostsDateValidator.PostsDatesAssendingSort(res)})
            }))

        })
    }

    DeletePost(post_id){

        Swal.fire({
            title: 'Вы точно хотите удалить пост?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да',
            cancelButtonText:'Нет'
        }).then((result) => {

            if (result.value) {
                console.log("delete action");
                server.RemovePost(post_id).then(result=>{

                    server.GetPosts(JSON.parse(sessionController.ParseSessionInformation())).then(res=>{
                        console.log(JSON.stringify(res));
                        this.GetPosts();
                        // this.setState(()=>({
                        //     posts:res
                        // }))
                    })

                })

                Swal.fire({
                    icon:"success",
                    title:"Ваш пост был удален!"
                    }
                )
            }
        })

    }

    SettingsEmmiter(post_id){
        window.location=`/manage/changepost/${post_id}`;
    }

    LocateToPostAdd =()=>{
        window.location="/manage/addpost";
    }



    render() {
        let HelpText;

        if(this.state.posts!==null){
            if(this.state.posts.length<1){
                HelpText = <h4 className={"text-center mt-2"}>Вы пока еще не создали ни одного поста.
                    Для того, чтобы создать пост, <a href={"/manage/addpost"}>перейдите сюда</a>.
                </h4>
            }
        }

        return (

            <div className={"container container-default-top-margin container-default-bottom-margin"}>

                <div className={"sidepanel-main-channels-container flex-column container"}>

                    <h1 className={"text-center mt-2"}>Посты</h1>
                    {HelpText}

                    {this.state.posts=== null ?
                        <div>Loading</div>
                        :
                        // this.state.posts.map((channel)=>{
                        //     return( <Post id={channel.post_id}classname={"little-margin-style"} channel={"Канал: "+channel.channel_id} account={"Аккаунт: " + channel.account_id}
                        //              header={"Заголовок: "+ channel.title} sending_time={channel.sending_time}  settingsEmmiter={this.SettingsEmmiter}   deleteEmmiter={this.DeletePost}/>)
                        // })
                        this.state.posts.map((array,index)=>{

                            return ([

                                <h1 className={"mt-2"}>{ new Date(array[0].sending_time).toLocaleString('ru', { month: 'long' }) +" "+ new Date(array[0].sending_time).getFullYear()}</h1>,



                                <div className={"sidepanel-main-channels-container "}>

                                    {

                                        array.map((channel)=>{

                                            return <Post id={channel.post_id}classname={"little-margin-style"} channel={"Канал: "+channel.channel_id} account={"Аккаунт: " + channel.account_id}
                                                         header={"Заголовок: "+ channel.title} sending_time={channel.sending_time}  settingsEmmiter={this.SettingsEmmiter}   deleteEmmiter={this.DeletePost}/>
                                        })

                                    }

                                    <div className={"sidepanel-content-container-channel-add mt-4 " } onClick={this.LocateToPostAdd}>

                                        <img className={"sidepanel-content-container-add-icon "}  src="/img/plus.png" />


                                    </div>

                                </div>,





                            ])})
                    }



                    {/*return(<Post text={channel.sending_time}/>)*/}

                    {/*<div className={"sidepanel-content-container-channel-add mt-4 " } onClick={this.AddChannel} >*/}

                    {/*    <img className={"sidepanel-content-container-add-icon "}  src="/img/plus.png" />*/}


                    {/*</div>*/}





                </div>





            </div>

        );
    }

}

export default Posts;