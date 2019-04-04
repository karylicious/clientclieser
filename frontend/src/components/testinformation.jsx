import React, { Component } from 'react'

class Information extends Component {


    state = {
        port: 8910
    }
    renderTestInfo() {

        if (this.props.selectedComponent === "client")
            return this.renderClientInfo()
        else if (this.props.selectedComponent === "server")
            return this.renderServerInfo()

        else if (this.props.selectedComponent === "both")
            return this.renderClientServerInfo()
    }

    renderClientInfo() {
        return (
            <div className="col">
                <p>In order to successufully test a Client component:</p>
                <ul>
                    <li>We assume that the Client being tested will try to communicate with a server already running somewhere on Internet. </li>
                </ul>
                {this.renderCommonInfo("Client")}
            </div>
        )
    }

    renderServerInfo() {
        return (
            <div className="col">
                <p>In order to successufully test a Server component:</p>
                <ul>
                    <li>Server has to listen on port {this.state.port}. Make sure your Server is listening on port {this.state.port}.</li>
                </ul>
                {this.renderCommonInfo("Server")}
            </div>
        )
    }

    renderClientServerInfo() {
        return (
            <div className="col">
                <p>In order to successufully test both Client and Server components:</p>
                <ul>
                    <li>We assume that both Client and Server components will try to communicate to each other.</li>
                    <li>Both Client and Server have to be written in Java.</li>
                    <li>Both Client and Server have to be in separate project.</li>
                    <li>Each project has to be a NetBeans project.</li>
                    <li>If testing a single project with both Client and Server components, the zip file being uploaded must contain the project directories of each components.</li>
                    <li>If testing multiple projects with both Client and Server components, the zip file being uploaded must contain a zip file of each projects containing the project directories of each components.</li>
                    <li>If testing multiple projects, we assume that the class with the main method and its package names are the same for each project.</li>
                </ul>
            </div>
        )
    }

    renderCommonInfo(selectedComponent) {
        return (
            <ul>
                <li>The {selectedComponent} has to be written in Java.</li>
                <li>The project has to be a NetBeans project.</li>
                <li>If testing a single project, the zip file being uploaded must contain the project directory.</li>
                <li>If testing multiple projects, the zip file being uploaded must contain a zip file of each projects.</li>
                <li>If testing multiple projects, we assume that the class with the main method and its package names are the same for each project.</li>
            </ul>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6"><h4>Before testing</h4><hr className="myhr" /></div>
                </div>
                <div className="row bottomspace">
                    {this.renderTestInfo()}
                </div>
            </div>
        );
    }
}
export default Information