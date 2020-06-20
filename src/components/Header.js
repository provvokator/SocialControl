import React from 'react';
import sessionController from '../controllers/SessionController'


class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            label:props.label,
            activeUser:"Войти"
        }
    }

    componentDidMount() {

        console.log(sessionController.isAuthorized() );

    }

    render(){


        return(

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark z-index-2">
                <a className="navbar-brand" href="/">{this.state.label}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        {sessionController.isAuthorized() ?([
                                <li className="nav-item d-none d-md-block d-lg-none d-none d-sm-block d-md-non d-block d-sm-none">
                                    <a className="nav-link" href="/manage">Профиль</a>
                                </li>,
                                <li className="nav-item d-none d-md-block d-lg-none d-none d-sm-block d-md-non d-block d-sm-none">
                                    <a className="nav-link" onClick={sessionController.RemoveSession} href="/r">Выйти</a>
                                </li>

                            ]



                        ) : ([
                            <li className="nav-item d-none d-md-block d-lg-none d-none d-sm-block d-md-non d-block d-sm-none">
                                <a className="nav-link" href="/login">Войти</a>
                            </li>,
                            <li className="nav-item d-none d-md-block d-lg-none d-none d-sm-block d-md-non d-block d-sm-none">
                                <a className="nav-link" href="/register">Регистрация</a>
                            </li>

                            ]

                        )}




                        <li className="nav-item">
                            <a className="nav-link" href="/faq">FAQ</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Контакты</a>
                        </li>



                    </ul>
                </div>

                <form className="form-outline d-none d-lg-block d-xl-none d-xl-block">

                    {sessionController.isAuthorized() ? ([
                            <a href={"/manage"} className="btn btn-outline-success my-2  my-sm-0 nav-item" type="submit" style={{color:"#ffffff"}}>Профиль</a>,
                             <a onClick={sessionController.RemoveSession} href={"/"} className="btn btn-outline-primary my-2 ml-2 my-sm-0 nav-item" type="submit" style={{color:"#ffffff"}}>Выйти</a>

                        ]



                    ) : ([
                            <a href={"/login"}  className="btn btn-outline-success my-2  my-sm-0 nav-item" type="submit" style={{color:"#ffffff"}}>Войти</a>,
                            <a href={"/register"} onClick={sessionController.RemoveSession} className="btn btn-outline-primary my-2 ml-2 my-sm-0 nav-item" type="submit" style={{color:"#ffffff"}}>Регистрация</a>

                        ]

                    )}

                </form>

            </nav>

        )
    }



}

export default Header