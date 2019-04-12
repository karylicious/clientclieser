import React, { Component } from 'react'
import TestResult from './testresult'
import axios from 'axios'

export default class Test extends Component {
    state = {
        testResultList: null
    }

    setURLparameters() {
        try {
            var selectedFile = this.props.uploadedFile.split(".zip")
            if (this.props.selectedComponent === "client")
                return '/testclient?clientEntryPoint=' + this.props.clientEntryPoint + '&dir=' + this.props.dir + '&selectedFileName=' + selectedFile[0]

            else if (this.props.selectedComponent === "both")
                return '/testclientserver?clientEntryPoint=' + this.props.clientEntryPoint + '&dir=' + this.props.dir + '&selectedFileName=' + selectedFile[0]
        }
        catch (err) {
            console.log("An error has occured")
            return null
        }
    }

    getResults() {
        axios.get('http://localhost:5000' + this.setURLparameters())
            .then(response => {

                for (var i = 0; i < response.data['responseList'].length; i++) {
                    document.getElementById("progressDiv").innerHTML += response.data['responseList'][i] + "<br />"
                }
                var newTestButton = document.getElementById("newTest")
                newTestButton.style.display = "block"
                this.deleteDirectory()
                this.setState({ testResultList: response.data['testResultList'] })
            })
    }

    deleteDirectory() {
        var directory = this.props.dir.split("/")
        axios.delete('http://localhost:5000/zipfile?dir=' + directory[0])
    }

    componentDidMount() {
        var newTestButton = document.getElementById("newTest")
        newTestButton.style.display = "none"
        this.getResults()
    }

    getSelectedComponent() {
        if (this.props.selectedComponent === "client")
            return "Client component"

        else if (this.props.selectedComponent === "server")
            return "Server component"
        else if (this.props.selectedComponent === "both")
            return "Client and Server components"
    }



    render() {
        const rowsWithTestResults = [], rowWithHeading = []
        if (this.state.testResultList !== null) {



            var passedTest = true
            var prevOwner = ""
            for (var i = 0; i < this.state.testResultList.length; i++) {
                if (prevOwner === "") {
                    prevOwner = this.state.testResultList[i]['projectOwner']
                    rowsWithTestResults.push(
                        <TestResult
                            key={i}
                            resultID={i}
                            projectOwner={this.state.testResultList[i]['projectOwner']}
                            resultsList={this.state.testResultList}
                        />
                    )
                }
                else if (prevOwner !== this.state.testResultList[i]['projectOwner']) {
                    prevOwner = ""
                }
            }

            rowWithHeading.push(
                <div key={50} className="row">
                    <div className="col-sm-7">
                        <p className="psummary presults">Final Results</p>
                    </div>
                </div>
            )




        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6"><h4 className="myh4">Validating the {this.getSelectedComponent()}</h4><hr className="myhr" /></div>
                </div>
                <div className="row">
                    <div className="col testprogress scrollbar myscrollbar" id="style-2">
                        <div className="force-overflow" id="progressDiv">Test is in progress, please wait...<br /><br /> </div>
                    </div>
                </div>
                {rowWithHeading}
                <div className="row">
                    <div className="container">
                        {rowsWithTestResults}
                    </div>
                </div>
            </div>
        )
    }
} 