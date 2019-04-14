import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './components/app'

ReactDOM.render(

    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>,

    document.getElementById('root'))