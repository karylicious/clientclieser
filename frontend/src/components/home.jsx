import React, { Component } from 'react'
import Navbar from './navbar'
import OpeningText from './openingtext'

class Home extends Component {
    render() {
        return (
            <div className="main" id="main">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-7">
                            <Navbar></Navbar>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-9">
                            <OpeningText></OpeningText>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home