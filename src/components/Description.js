import React from "react";


class Description extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={"container marketing"}>

                <hr className="featurette-divider"/>
                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">{this.props.header}<span className="text-muted">{this.props.subheader}</span>
                        </h2>
                        <p className="lead">{this.props.text}</p>
                    </div>
                    <div className="col-md-5">
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img className="featurette-image img-fluid mx-auto" src={this.props.image} alt="Generic placeholder image"/>

                    </div>
                </div>
                <hr className="featurette-divider"/>

            </div>
        )
    }

}

export default Description;