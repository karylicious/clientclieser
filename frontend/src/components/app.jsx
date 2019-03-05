import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './navbar'
import OpeningText from './openingtext'
import Validator from './validator'

class App extends Component {
    render() {
        return (
            <div>
                <div className="row main" id="main">
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
                <div className="row">
                    <Switch>
                        <Route path="/validator" component={Validator} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App