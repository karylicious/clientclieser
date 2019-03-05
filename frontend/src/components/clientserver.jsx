import React, { Component } from 'react'
import Client from './client'
import Server from './server'

class ClientServer extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Client></Client>
                </div>
                <div className="row clisermargin">
                    <Server></Server>
                </div>
            </div>
        );
    }
}
export default ClientServer