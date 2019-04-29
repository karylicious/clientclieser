import React, { Component } from 'react'

export default class Client extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6"><h4>Client Details</h4><hr className="myhr" /></div>
                </div>
                <div className="row">
                    <div className="col-sm-7">
                        <p>Names of the class with the main method and its package in this format <strong>com.example.MyMainClass</strong></p>
                        <input className="form-control myinputtext" type="text" name="clientEntryPoint" />
                    </div>
                </div>
            </div>
        )
    }
}