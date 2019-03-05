import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import * as serviceWorker from './serviceWorker'
import App from './components/app'


ReactDOM.render(

    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>,



    document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()