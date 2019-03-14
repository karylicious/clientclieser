import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './navbar'
import OpeningText from './openingtext'
import Validator from './validator'
import Home from './home'
import About from './about'
import Logo from './logo'
import ClientServerSystem from './clientserversystem'
import WriteClient from './writeclient'
import WriteServer from './writeserver'
import Tutorials from './tutorials'
import Notfound from './notfound'

class App extends Component {
    componentDidMount() {
        var mainContainer = document.getElementById('main')
        mainContainer.style.display = "block"
    }
    render() {
        return (
            <div>
                <div className="row" id="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <Logo></Logo>
                            </div>
                            <div className="col-sm-7">
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
                <div>
                    <Switch>
                        <Route path="/validator" exact component={Validator} />
                        <Route path="/client-server-system" exact component={ClientServerSystem} />
                        <Route path="/about" exact component={About} />
                        <Route path="/" exact component={Home} />
                        <Route path="/client-server-system/write-client" exact component={WriteClient} />
                        <Route path="/client-server-system/write-server" exact component={WriteServer} />
                        <Route path="/tutorials" exact component={Tutorials} />
                        <Route component={Notfound} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App