import React, { Component } from 'react'

class Server extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6"><h4>Server Details</h4><hr className="myhr" /></div>
                </div>
                <div className="row">
                    <div className="col-sm-7">
                        <p>Class with the main method and its package <span className="systemwarning"> (E.g com.example.MyMainClass)</span></p>
                        <input className="form-control myinputtext" type="text" name="serverEntryPoint" />
                    </div>
                </div>
            </div >
        );
    }
}
export default Server