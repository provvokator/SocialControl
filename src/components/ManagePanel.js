import React from "react";
import '../styles/ManagePanel.css'
import sessionController from '../controllers/SessionController'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import UserInterface from "./UserInterface";
import Settings from "./ManagePanelSubcomponents/Settings";
import Posts from "./ManagePanelSubcomponents/Posts";
import Channels from "./ManagePanelSubcomponents/Channels";
import Accounts from "./ManagePanelSubcomponents/Accounts";
import AddPost from "./ManagePanelSubcomponents/AddPost"
import Payment from "./ManagePanelSubcomponents/Payment";



class ManagePanel extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return([


            <nav className="navbar navbar-expand-lg navbar-dark z-index-2 bg-dark nav-fix-position">
                <a className="navbar-brand" href="/">SocialControl</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto sidenav" id="navAccordion">

                        <li className="nav-item active nav-item-padding ">
                            <a className="nav-link" href="/">SocialControl <span className="sr-only">(current)</span></a>
                        </li>


                        <li className="nav-item nav-item-padding">
                            <a className="nav-link" href="/manage/posts">Посты</a>
                        </li>

                        {/*<li className="nav-item nav-item-padding">*/}
                        {/*    <a className="nav-link" href="/manage/addpost">Добавить пост</a>*/}
                        {/*</li>*/}

                        <li className="nav-item nav-item-padding">
                            <a className="nav-link" href="/manage/channels">Каналы</a>
                        </li>

                        <li className="nav-item nav-item-padding">
                            <a className="nav-link" href="/manage/accounts">Аккаунты</a>
                        </li>

                        <li className="nav-item nav-item-padding">
                            <a className="nav-link" href="/manage/payment">Оплата</a>
                        </li>

                        <li className="nav-item nav-item-padding">
                            <a className="nav-link" href="/manage">Настройки</a>
                        </li>
                    </ul>
                    <form className="form-inline ml-auto mt-2 mt-md-0">
                        {/*<input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>*/}
                            <a onClick={sessionController.RemoveSession} href={'/'} className="btn btn-outline-primary my-2 ml-2 my-sm-0 nav-item text-light" type="submit">Выйти</a>
                    </form>
                </div>
            </nav>,

            <main className = "content-wrapper" >
                <div className = "container-fluid" >
                {/*<h1 > Main Content </h1>*/}

                    <BrowserRouter>

                        <Switch>

                            <Route path={'/manage/channels'} component={Channels} />

                            <Route path={'/manage/posts'} component={Posts}/>

                            <Route path={'/manage/accounts'} component={Accounts} />

                            <Route path={'/manage/changepost/:id'} component={AddPost} />

                            <Route path={'/manage/addpost'} component={AddPost}/>

                            <Route path={'/manage/payment'} component={Payment}/>

                            <Route path={'/manage/'} component={Settings}/>




                        </Switch>
                    </BrowserRouter>

                </div>
                </main>





        ])
    }

}

export default ManagePanel