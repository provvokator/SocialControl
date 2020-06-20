import React from "react";


class Payment extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(    <div className={"container container-default-top-margin container-default-bottom-margin"}>
            <h1 className={"text-center mt-2"}>Оплата</h1>




            <h5 className={"text text-justify mt-4 text-center"}>На данный момент наш сервис предоставляется абсолютно бесплатно!</h5>




        </div>)
    }
}

export default Payment;