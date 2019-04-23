import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'

export default class Development extends Component {

    renderWriteClient = () => {
        this.props.history.push("/development/write-client")
    }

    renderWriteServer = () => {
        this.props.history.push("/development/write-server")
    }

    render() {
        return (
            <div>
                <TopContainer standardOpening={false} />
                <div className="fullheight">
                    <h2 className="myh2">Learn how to build a client server system</h2>
                    <div className="row bottomspace topspace">
                        <div className="col-sm-6">
                            <div className="elementCentered blurredElement panelOptions" onClick={this.renderWriteClient}>
                                <img src={process.env.PUBLIC_URL + '/imgs/client.png'} alt="client" className="img-fluid" />
                                <p className="alignCenter"> Write<br /> a<br /> Client</p>
                                <p className="bluep" onClick={this.renderWriteClient}>Let's go  <img src={process.env.PUBLIC_URL + '/imgs/rarrow.png'} alt="arrow" width="15px" /></p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="elementCentered blurredElement panelOptions" onClick={this.renderWriteServer}>
                                <img src={process.env.PUBLIC_URL + '/imgs/server.png'} alt="server" className="img-fluid" />
                                <p className="alignCenter">Write<br /> a<br /> Server</p>
                                <p className="bluep" onClick={this.renderWriteServer}>Let's go  <img src={process.env.PUBLIC_URL + '/imgs/rarrow.png'} alt="arrow" width="15px" /></p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
} 