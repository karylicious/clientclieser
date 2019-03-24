import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'

class ClientServerSystem extends Component {

    renderWriteClient = () => {
        this.props.history.push("/client-server-system/write-client");
    }

    renderWriteServer = () => {
        this.props.history.push("/client-server-system/write-server");
    }

    render() {
        return (
            <div>
                <div><TopContainer standardOpening={false} /></div>
                <div className="fullheight">
                    <h2 className="myh2">Learn how to build a client server system</h2>
                    <div className="row bottomspace topspace">
                        <div className="col-sm-6">
                            <div className="elementCentered blurredElement">
                                <img src={process.env.PUBLIC_URL + '/imgs/client.png'} alt="client" className="img-fluid" />
                                <p className="alignCenter"> Write<br /> a<br /> Client</p>
                                <p className="bluep" onClick={this.renderWriteClient}>Let's go  <img src={process.env.PUBLIC_URL + '/imgs/rarrow.png'} alt="arrow" width="15px" /></p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="elementCentered blurredElement">
                                <img src={process.env.PUBLIC_URL + '/imgs/server.png'} alt="server" className="img-fluid" />
                                <p className="alignCenter">Write<br /> a<br /> Server</p>
                                <p className="bluep" onClick={this.renderWriteServer}>Let's go  <img src={process.env.PUBLIC_URL + '/imgs/rarrow.png'} alt="arrow" width="15px" /></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="otherFooter"><Footer /></div>
            </div>
        );
    }
}
export default ClientServerSystem