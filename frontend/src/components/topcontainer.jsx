import React, { Component } from 'react'
import Navbar from './navbar'
import OpeningText from './openingtext'
import Logo from './logo'

class TopContainer extends Component {
    renderOpening() {
        if (this.props.standardOpening) {
            return (
                <div className="row main" id="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4"></div>
                            <div className="col-sm-8">
                                <Navbar></Navbar>
                            </div>
                        </div>
                        <div className="row" id="openingTestRow">
                            <div className="col-sm-8">
                                <OpeningText></OpeningText>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="row">
                    <div className="col-sm-4">
                        <Logo></Logo>
                    </div>
                    <div className="col-sm-8">
                        <Navbar></Navbar>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>{this.renderOpening()}</div>
        )
    }
}
export default TopContainer