import React, { Component } from 'react'
import Client from './client'
import Server from './server'
import ClientServer from './clientserver'
import Summary from './summary'
import Test from './test'
import Progress from './progress'
import FileUpload from './fileupload'
import Footer from './footer'
import Information from './testinformation'

class Validator extends Component {
    state = {
        step: 1,
        selectedComponent: '',
        clientEntryPoint: '',
        serverEntryPoint: '',
        uploadedFile: '',
        dir: ''
    }

    componentDidMount() {
        var mainContainer = document.getElementById('main')
        mainContainer.style.display = "block"
        mainContainer.classList.remove("main")

        var row = document.getElementById('openingTestRow')
        row.style.display = "none"

        var topLogo = document.getElementById('toplogo')
        topLogo.style.display = "block"
    }
    renderSelectedComponent() {
        switch (this.state.step) {
            case 1:
                return this.renderStepOne()
            case 2:
                if (this.state.selectedComponent === "client")
                    return <Client />

                else if (this.state.selectedComponent === "server")
                    return <Server />

                else if (this.state.selectedComponent === "both")
                    return <ClientServer />
                break
            case 3:
                return <Summary selectedComponent={this.state.selectedComponent}
                    clientEntryPoint={this.state.clientEntryPoint}
                    serverEntryPoint={this.state.serverEntryPoint}
                    uploadedFile={this.state.uploadedFile} />
            case 4:
                return <Test selectedComponent={this.state.selectedComponent}
                    clientEntryPoint={this.state.clientEntryPoint}
                    serverEntryPoint={this.state.serverEntryPoint}
                    uploadedFile={this.state.uploadedFile}
                    dir={this.state.dir} />
            default:
                return null
        }
    }

    renderTestInfo() {
        if (this.state.step === 2) {
            return <Information selectedComponent={this.state.selectedComponent} />
        }
    }

    renderProgressLine() {
        if (this.state.step < 4) {
            return <Progress step={this.state.step}></Progress>
        }
    }

    render() {
        return (
            <div>
                <div className="fullheight">
                    <h2 className="myh2">Test your Client Server System</h2>
                    <div className="row bottomspace">
                        {this.renderProgressLine()}
                        {this.renderTestInfo()}
                        {this.renderSelectedComponent()}
                        {this.renderFileUpload()}
                        {this.renderNavigation()}
                    </div>
                    <div className="otherFooter"><Footer /></div>
                </div>

            </div>
        );
    }

    chooseClient = () => {
        this.setState({ selectedComponent: 'client' })
    }

    chooseServer = () => {
        this.setState({ selectedComponent: 'server' })
    }

    chooseBoth = () => {
        this.setState({ selectedComponent: 'both' })
    }

    nextStep = () => {
        if (this.state.selectedComponent !== '') {
            if (this.state.step === 1)
                this.setState({ step: this.state.step + 1 })

            else if (this.state.step === 2) {
                if (this.validateControlsAndGetUserInput())
                    this.setState({ step: this.state.step + 1 })
            }
            else if (this.state.step === 3) {
                this.setState({ step: this.state.step + 1 })
            }
            else if (this.state.step === 4) {
                this.setState({
                    step: 1,
                    selectedComponent: '',
                    clientEntryPoint: '',
                    serverEntryPoint: '',
                    uploadedFile: '',
                    dir: ''
                })
            }
        }
    }

    prevStep = () => {
        if (this.state.selectedComponent !== '')
            this.setState({ step: this.state.step - 1 })
    }

    renderButton() {
        switch (this.state.step) {
            case 1:
                return (
                    <div className="textright">
                        <button className="mybtn" onClick={this.nextStep}>Next</button>
                    </div>
                )
            case 2:
                return (
                    <div className="textright">
                        <button className="mybtn" onClick={this.prevStep}>Previous</button> <button className="mybtn" onClick={this.nextStep}>Next</button>
                    </div>
                )

            case 3:
                return (
                    <div className="textright">
                        <button className="mybtn" onClick={this.prevStep}>Previous</button> <button className="mybtn" onClick={this.nextStep}>Start Test</button>
                    </div>
                )
            case 4:
                return (
                    <p className="buttoncentered" id="newTest"><button className="mybtn" onClick={this.nextStep}>New Test</button> </p>
                )
            default:
                return null
        }
    }

    renderFileUpload() {
        if (this.state.step === 2) {
            switch (this.state.selectedComponent) {
                case 'client':
                    return (
                        <FileUpload chosencomponent='Client' validFileSize={1}></FileUpload>
                    )
                case 'server':
                    return (
                        <FileUpload chosencomponent='Server' validFileSize={1}></FileUpload>
                    )
                case 'both':
                    return (
                        <FileUpload chosencomponent='Client Server' validFileSize={2}></FileUpload>
                    )
                default:
                    return null
            }
        }
    }

    renderNavigation() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {this.renderButton()}
                    </div>
                </div>
            </div>
        )
    }

    renderStepOne() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6"><h4>Choose the component to be tested</h4><hr className="myhr" /></div>
                </div>
                <div className="row">
                    <div className={(this.state.selectedComponent === 'client') ? "col-sm-3 mycomponentselected" : "col-sm-3 mycomponents"} onClick={this.chooseClient}>Client</div>
                    <div className={(this.state.selectedComponent === 'server') ? "col-sm-3 mycomponentselected" : "col-sm-3 mycomponents"} onClick={this.chooseServer}>Server</div>
                    <div className={(this.state.selectedComponent === 'both') ? "col-sm-3   mycomponentselected" : "col-sm-3 mycomponents"} onClick={this.chooseBoth}>Both <br />Client and Server</div>
                </div>
            </div>
        );
    }

    validateControlsAndGetUserInput() {
        var allElements = document.getElementsByClassName("form-control")
        var valid = true

        for (var i = 0; i < allElements.length; i++) {
            var userInput = allElements[i].value.trim()
            if (userInput === '') {
                valid = false
                allElements[i].className += " is-invalid"
            }
            else {
                allElements[i].classList.remove("is-invalid")
                this.getUserInput(allElements[i].name, userInput)
            }
        }

        var feedbackDiv = document.getElementById("uploadFeedback")
        if (feedbackDiv.innerHTML === '') {
            document.getElementById("inputGroupFile").className += " is-invalid"
            valid = false
        }
        else {
            document.getElementById("inputGroupFile").classList.remove("is-invalid")
            var value = document.getElementById("uploadvalidation").innerHTML
            if (value !== '') {
                valid = false
            }
        }

        if (valid) {
            var label = document.getElementsByClassName("custom-file-label")
            var fileName = label[0].innerHTML

            this.setState({ uploadedFile: fileName })
            this.setState({ dir: document.getElementById("hid").value })
        }

        return valid
    }

    getUserInput(domElementName, domElementVaule) {
        if (domElementName === 'clientEntryPoint')
            this.setState({ clientEntryPoint: domElementVaule })

        else if (domElementName === 'serverEntryPoint')
            this.setState({ serverEntryPoint: domElementVaule })
    }
}
export default Validator