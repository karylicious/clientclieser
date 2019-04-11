import React, { Component } from 'react'
import GradingResult from './gradingresult'
import axios from 'axios'

export default class Grading extends Component {
    state = {
        gradingResultList: null
    }

    setURLparameters = () => {
        try {
            var selectedFile = this.props.uploadedFile.split(".zip")
            if (this.props.selectedComponent === "client")
                return '/gradeclient?clientEntryPoint=' + this.props.clientEntryPoint + '&dir=' + this.props.dir + '&selectedFileName=' + selectedFile[0]

            else if (this.props.selectedComponent === "clientserver")
                return '/gradeclientserver?clientEntryPoint=' + this.props.clientEntryPoint + '&dir=' + this.props.dir + '&selectedFileName=' + selectedFile[0]
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
                var newAnswerButton = document.getElementById("newAnswer")
                newAnswerButton.style.display = "block"
                this.deleteDirectory()
                this.setState({ gradingResultList: response.data['gradingResultList'] })
            })
    }

    deleteDirectory = () => {
        var directory = this.props.dir.split("/")
        axios.delete('http://localhost:5000/zipfile?dir=' + directory[0])
    }

    componentDidMount() {
        var newAnswerButton = document.getElementById("newAnswer")
        newAnswerButton.style.display = "none"
        this.getResults()
    }

    render() {
        const rowsWithGradingResults = [], rowWithHeading = []
        if (this.state.gradingResultList !== null) {


            /*
            var passedTest = true
            var prevOwner = ""
            for (var i = 0; i < this.state.testResultList.length; i++) {
                if (prevOwner === "") {
                    prevOwner = this.state.testResultList[i]['projectOwner']
                    rowsWithGradingResults.push(<GradingResult key={i} resultID={i} projectOwner={this.state.testResultList[i]['projectOwner']} resultsList={this.state.testResultList} />);
                }
                else if (prevOwner !== this.state.testResultList[i]['projectOwner']) {
                    prevOwner = ""
                }
            }*/

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
                    <div className="col"><h4 className="myh4">Grading your answer</h4><hr className="myhr" /></div>
                </div>
                <div className="row">
                    <div className="col testprogress scrollbar myscrollbar" id="style-2">
                        <div className="force-overflow" id="progressDiv">Grading is in progress, please wait...<br /><br /> </div>
                    </div>
                </div>
                {rowWithHeading}
                <div className="row">
                    <div className="container">
                        {rowsWithGradingResults}
                    </div>
                </div>
                <div className="row">
                    <p className="buttoncentered" id="newAnswer"><button className="mybtn" onClick={this.props.handleNewAnswer}>New Answer</button> </p>
                </div>
            </div>
        )
    }
}