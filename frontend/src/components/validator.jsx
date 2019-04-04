import React, { Component } from 'react'
import Client from './client'
import Summary from './summary'
import Test from './test'
import Progress from './progress'
import FileUpload from './fileupload'
import Footer from './footer'
import Information from './testinformation'
import TopContainer from './topcontainer'

class Validator extends Component {
    state = {
        step: 1,
        selectedComponent: '',
        clientEntryPoint: '',
        serverEntryPoint: '',
        uploadedFile: '',
        dir: ''
    }


    renderSelectedComponent() {
        switch (this.state.step) {
            case 1:
                return this.renderStepOne()
            case 2:
                return <Client />
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
                <div><TopContainer standardOpening={false} /></div>
                <div className="fullheight">
                    <h2 className="myh2">Test your Client Server System</h2>
                    <div className="row bottomspace">
                        {this.renderProgressLine()}
                        {this.renderTestInfo()}
                        {this.renderSelectedComponent()}
                        {this.renderFileUpload()}
                        {this.renderNavigation()}
                    </div>
                </div>
                <div className="otherFooter"><Footer /></div>
            </div>
        )
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

    setPath = (path) => {
        this.setState({ dir: path })
    }

    renderFileUpload() {
        if (this.state.step === 2) {
            switch (this.state.selectedComponent) {
                case 'client':
                    return (
                        <FileUpload uploadedFile={this.setPath} colClass={"col-sm-7"} fileUploadHeadings='Upload your Client project as .zip file'></FileUpload>
                    )
                case 'server':
                    return (
                        <FileUpload uploadedFile={this.setPath} colClass={"col-sm-7"} fileUploadHeadings='Upload your Server project as .zip file'></FileUpload>
                    )
                case 'both':
                    return (
                        <FileUpload uploadedFile={this.setPath} colClass={"col-sm-7"} fileUploadHeadings='Upload your Client Server project as .zip file'></FileUpload>
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
                    <div className={(this.state.selectedComponent === 'client') ? "col mycomponentselected" : "col mycomponents"} onClick={this.chooseClient}>Client</div>
                    <div className={(this.state.selectedComponent === 'both') ? "col mycomponentselected" : "col mycomponents"} onClick={this.chooseBoth}>Both <br />Client and Server</div>
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
            document.getElementById("fileChooserTextField").className += " is-invalid"
            valid = false
        }
        else {
            document.getElementById("fileChooserTextField").classList.remove("is-invalid")
            var value = document.getElementById("uploadvalidation").innerHTML
            if (value !== '') {
                valid = false
            }
        }

        if (valid) {
            var fileName = document.getElementById("fileChooserLabel").innerHTML
            this.setState({ uploadedFile: fileName })
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