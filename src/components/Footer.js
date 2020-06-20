import React from "react";
import sessionController from '../controllers/SessionController'
import {Route} from "react-router-dom";
import ManagePanel from "./ManagePanel";
import auth from "./AuthForm";


class Footer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            copyright:props.copyright,
        }
    }

    render() {
        return(
            <footer className={"navbar-fixed-bottom font-small bg-dark"} id={"footer"}>




                <div className="container">
                    <div className="row">
                        <div className="col-sm w-50">
                            <h6 className="title text-light w-25 little-margin-style footer-header-text-size">SocialControl</h6>
                            <ul>


                                {sessionController.isAuthorized() ? ([

                                        <li className="list-unstyled w-25 footer-text-size">
                                            <a href="/manage">Профиль</a>
                                        </li>,
                                        <li className="list-unstyled w-25 footer-text-size">
                                            <a onClick={sessionController.RemoveSession} href="/">Выйти</a>
                                        </li>

                                    ]



                                ) : ([
                                        <li className="list-unstyled w-25 footer-text-size">
                                            <a href="/login">Войти</a>
                                        </li>,
                                        <li className="list-unstyled w-25 footer-text-size">
                                            <a href="/register">Зарегистрироваться</a>
                                        </li>

                                    ]

                                )}

                            </ul>
                        </div>
                        <div className="col-sm w-50">
                            <h6 className="title text-light w-25 little-margin-style footer-header-text-size">Помощь</h6>
                            <ul>
                                <li className="list-unstyled w-25 footer-text-size">
                                    <a href="/faq">FAQ</a>
                                </li>
                                <li className="list-unstyled w-25 footer-text-size">
                                    <a href="/contact">Контакты</a>
                                </li>

                            </ul>
                        </div>

                    </div>
                </div>
                <div className={"footer-copyright footer-text-size text-center text-light py-3"} >
                    {this.state.copyright}
                </div>

            </footer>)


    }

}

export default Footer;