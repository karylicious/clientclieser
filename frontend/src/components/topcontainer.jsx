import React, { Component } from 'react'
import Navbar from './navbar'
import OpeningText from './openingtext'
import Logo from './logo'

export default class TopContainer extends Component {
    renderOpening() {
        if (this.props.standardOpening) {
            return (
                <div className="row main" id="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4"></div>
                            <div className="col-sm-8">
                                <Navbar />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <OpeningText />
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
                        <Logo />
                    </div>
                    <div className="col-sm-8">
                        <Navbar />
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