import React from "react";


class NamedTextArea extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value:props.value,
        };
        this.onValueChange = this.onValueChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    onValueChange(e){
        this.setState(()=>({
            value:this.myInput.value
        }))
    }

    render() {

        return([
                <p className={'text-justify blockquote little-margin-style'}>{this.props.label}</p>,
                <textarea ref={input=>{this.myInput = input}} value={this.state.value} onChange={this.onValueChange} type={this.props.type} style={{width:this.props.width,height:this.props.height}} className={'form-control'} required={"true"}/>
            ]
        )

    }

}

export default NamedTextArea;