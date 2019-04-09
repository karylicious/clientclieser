import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Validator from './validator'
import Home from './home'
import About from './about'
import ClientServerSystem from './clientserversystem'
import WriteClient from './writeclient'
import WriteServer from './writeserver'
import Tutorials from './tutorials'
import Notfound from './notfound'
import Exercises from './exercises'
import CMS from './cms'
import NewExercise from './cms-new-exercise'
import ListExercises from './cms-all-exercises'
import Management from './cms-management'

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Switch>
                        <Route path="/validator" exact component={Validator} />
                        <Route path="/client-server-system" exact component={ClientServerSystem} />
                        <Route path="/about" exact component={About} />
                        <Route path="/exercises" exact component={Exercises} />
                        <Route path="/" exact component={Home} />
                        <Route path="/client-server-system/write-client" exact component={WriteClient} />
                        <Route path="/client-server-system/write-server" exact component={WriteServer} />
                        <Route path="/tutorials" exact component={Tutorials} />
                        <Route path="/cms" exact component={CMS} />
                        <Route path="/cms/new-exercise/:username" exact component={NewExercise} />
                        <Route path="/cms/all-exercises/:username" exact component={ListExercises} />
                        <Route path="/cms/management/:username" exact component={Management} />
                        <Route component={Notfound} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App