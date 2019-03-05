import React, { Component } from 'react'

class Summary extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6"><h4>Summary</h4><hr className="myhr" /></div>
                </div>
                <div className="row">
                    <div className="col-sm-7">
                        <p className="psummary">Component to be tested</p>
                        <p>{this.getSelectedComponent()}</p>
                        {this.getClientDetails()}
                        {this.getServerDetails()}
                        <p className="psummary">Uploaded file</p>
                        <p>{this.props.uploadedFile}</p>
                    </div>
                </div>
            </div>
        );
    }

    getSelectedComponent() {
        switch (this.props.selectedComponent) {
            case 'client':
                return 'Client'
            case 'server':
                return 'Server'
            case 'both':
                return 'Both Client and Server'
            default:
                return null
        }
    }
    getClientDetails() {
        if (this.props.selectedComponent === 'client' || this.props.selectedComponent === 'both') {
            return (
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">Client Details</legend>
                    <p className="psummary">Class with the main method and its package</p>
                    <p>{this.props.clientEntryPoint}</p>
                </fieldset>
            )
        }

    }
    getServerDetails() {
        if (this.props.selectedComponent === 'server' || this.props.selectedComponent === 'both') {
            return (
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">Server Details</legend>
                    <p className="psummary">Class with the main method and its package</p>
                    <p>{this.props.serverEntryPoint}</p>
                </fieldset>
            )
        }
    }
}

export default Summary