import React, { Component } from 'react'
import GradingResult from './gradingresult'
import axios from 'axios'

var clieserRestApiHostName = 'https://clieser-restapi.herokuapp.com'

export default class Grading extends Component {
    state = {
        gradingResultList: [],
        finalGrade: ""
    }

    setURLparameters = () => {
        try {
            var selectedFile = this.props.uploadedFile.split(".zip")

            if (this.props.selectedComponent === "client")
                return '/gradeclient?clientEntryPoint=' + this.props.cliententrypoint + '&dir=' + this.props.dir + '&selectedFileName=' + selectedFile[0] + "&exerciseid=" + this.props.selectedExerciseID

            else if (this.props.selectedComponent === "clientserver")
                return '/gradeclientserver?clientEntryPoint=' + this.props.cliententrypoint + '&dir=' + this.props.dir + '&selectedFileName=' + selectedFile[0] + "&exerciseid=" + this.props.selectedExerciseID
        }
        catch (error) {
            return null
        }
    }

    getResults() {
        axios.get(clieserRestApiHostName + this.setURLparameters())
            .then(response => {
                if (response.data['responseList'].length === 0)
                    document.getElementById("progressDiv").innerHTML += "The system is currently unavailable. Please try again later."

                for (var i = 0; i < response.data['responseList'].length; i++) {
                    document.getElementById("progressDiv").innerHTML += response.data['responseList'][i] + "<br />"
                }

                var newAnswerButton = document.getElementById("newAnswer")
                newAnswerButton.style.display = "block"

                this.deleteDirectory()
                this.setState({ gradingResultList: response.data['gradingResultList'], finalGrade: response.data['finalGrade'] })
            })
    }

    deleteDirectory = () => {
        var directory = this.props.dir.split("/")
        axios.delete(clieserRestApiHostName + '/zipfile?dir=' + directory[0])
    }

    componentDidMount() {
        var newAnswerButton = document.getElementById("newAnswer")
        newAnswerButton.style.display = "none"
        this.getResults()
    }

    render() {
        const rowsWithGradingResults = [], rowWithHeading = []
        if (this.state.gradingResultList.length > 0) {

            var prevOwner = ""
            for (var i = 0; i < this.state.gradingResultList.length; i++) {
                if (prevOwner === "") {
                    prevOwner = this.state.gradingResultList[i]['projectOwner']
                    rowsWithGradingResults.push(
                        <GradingResult
                            key={i}
                            resultID={i}
                            projectOwner={this.state.gradingResultList[i]['projectOwner']}
                            resultsList={this.state.gradingResultList}
                            finalGrade={this.state.finalGrade}
                        />
                    )
                }
                else if (prevOwner !== this.state.gradingResultList[i]['projectOwner'])
                    prevOwner = ""
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
                    <p className="pCentered" id="newAnswer"><button className="mybtn" onClick={this.props.handleNewAnswer}>New Answer</button> </p>
                </div>
            </div>
        )
    }
}