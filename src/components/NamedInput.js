import React from "react";


class NamedInput extends React.Component{

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
                <input ref={input=>{this.myInput = input}} min={this.props.min} placeholder={this.props.placeholder} onKeyPress={this.props.onKeyPress} value={this.state.value} onChange={this.onValueChange} type={this.props.type} style={{width:this.props.width,height:this.props.height}} className={'form-control'} required={"true"}/>
            ]
        )

    }

}

export default NamedInput;