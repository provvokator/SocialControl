import React from "react";

class Post extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            id:null
        }
    }

    componentDidMount() {
        //console.log(this.props.match.params);
        this.setState(()=>({
            id:this.props.id
        }))
    }

    render(){
        return(
            <div className="post-container">

                <div className="post-container-top-icons" >


                <img className="post-container-icon post-container-icons-padding" onClick={()=>this.props.settingsEmmiter(this.state.id)}
                    src="https://storage.needpix.com/rsynced_images/computer-1293125_1280.png"/>

                <img onClick={()=>this.props.deleteEmmiter(this.state.id)}
                className="post-container-icon post-container-icons-padding" src="https://image.flaticon.com/icons/png/512/17/17047.png"/>

            </div>

        <div className="post-container-content mt-2">

            <p className={"post-container-content-header"}>{this.props.header}</p>
            <p className={"post-container-content-channel-name"}>{this.props.channel}</p>
            <p className={"post-container-content-account"}> {this.props.account}</p>
            <div classname={"post-container-content-date-container"}>
                <p className={"post-container-content-date"}>{this.props.sending_time}</p>
            </div>


        </div>



            </div>

        )
    }

}

export default Post