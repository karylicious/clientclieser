import React, { Component } from 'react'
import Logo from './logo'
import FileUpload from './fileupload'
import Footer from './footer'
import Question from './exercisequestion'
import axios from 'axios'

var rowsWithQuestions = []
class ExercisesManagement extends Component {
    state = {
        hasAddedNewQuestion: false,
        validForm: false,
        uploadedFile: '',
        dir: ''
    }

    addExercise = () => {
        if (this.isValidForm()) {
            var listOfQuestions = this.getListOfQuestions()
            var path = this.state.dir
            var data = { uploadedfile: path, questions: listOfQuestions }
            var jsonData = JSON.stringify(data);
            console.log(jsonData)
            axios.post('http://localhost:5000/exercise', jsonData, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    console.log(response.data)
                })
        }
    }

    isValidForm() {
        var valid = true
        if (!document.getElementById('radioClient').checked && !document.getElementById('radioClientServer').checked) {
            valid = false
            document.getElementById("radioHeadings").className += " redWarning"
        }
        else {
            document.getElementById("radioHeadings").classList.remove("redWarning")

            var feedbackDiv = document.getElementById("uploadFeedback")
            if (feedbackDiv.innerHTML === '') {
                document.getElementById("fileChooserTextField").className += " is-invalid"
                valid = false
            }
            else {
                var value = document.getElementById("uploadvalidation").innerHTML
                if (value !== '')
                    valid = false
            }
        }

        var allElements = document.getElementsByClassName("form-control")

        if (allElements.length == 0) {
            document.getElementById("pQuestionValidatorFeedback").innerHTML = "Please add a question"
            valid = false
        }
        else {
            document.getElementById("pQuestionValidatorFeedback").innerHTML = ""
            for (var i = 0; i < allElements.length; i++) {
                var userInput = allElements[i].value.trim()
                if (userInput === '') {
                    valid = false
                    allElements[i].className += " is-invalid"
                }
                else
                    allElements[i].classList.remove("is-invalid")
            }
        }

        if (valid) {
            var fileName = document.getElementById("fileChooserLabel").innerHTML
            this.setState({ uploadedFile: fileName })
            this.setState({ dir: document.getElementById("hid").value })
        }

        return valid
    }

    getListOfQuestions() {
        var listTitle = document.getElementsByClassName("questiontitle");
        var listDescr = document.getElementsByClassName("questiondescription");
        var listOfQuestions = []

        for (var i = 0; i < listTitle.length; i++)
            listOfQuestions.push({ title: listTitle[i].value, description: listDescr[i].value })
        return listOfQuestions
    }

    clientRadioButtonListener = () => {
        document.getElementById("radioHeadings").classList.remove("redWarning")
        this.setState({ selectedComponent: 'client' })
    }

    clientserverRadioButtonListener = () => {
        document.getElementById("radioHeadings").classList.remove("redWarning")
        this.setState({ selectedComponent: 'both' })
    }

    renderFileUpload() {
        if (this.state.selectedComponent === "client") {
            return (
                <div className="row bottomspace marginLeft-15">
                    <FileUpload uploadedFile={this.setPath} fileUploadHeadings='Upload a complete Web Service as .zip file' regularUser={false}></FileUpload>
                </div>
            )
        }
        else if (this.state.selectedComponent === "both") {
            return (
                <div className="row bottomspace marginLeft-15">
                    <FileUpload uploadedFile={this.setPath} fileUploadHeadings='Upload a dummy Client and a dummy Server as .zip file' regularUser={false}></FileUpload>
                </div>
            )
        }
    }

    handleAddQuestionButtonListener = () => {
        document.getElementById("pQuestionValidatorFeedback").innerHTML = ""
        rowsWithQuestions.push(<Question key={rowsWithQuestions.length}
            id={rowsWithQuestions.length}
            title=""
            description=""
            removeQuestion={this.removeQuestion} />)
        this.setState({ hasAddedNewQuestion: true }) // this is just to trigger the render method
    }

    setPath = (path) => {
        this.setState({ dir: path })
    }

    removeQuestion = (listOfQuestions) => {
        var newArray = []
        for (var i = 0; i < listOfQuestions.length; i++) {
            newArray.push(<Question key={i}
                id={i}
                removeQuestion={this.removeQuestion}
                title={listOfQuestions[i].title}
                description={listOfQuestions[i].description} />)
        }
        rowsWithQuestions = newArray
        this.setState({ hasAddedNewQuestion: false }) // this is just to trigger the render method
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4">
                        <Logo></Logo>
                    </div>
                </div>
                <div className="container">
                    <h2 className="myh2">Exercises</h2>
                    <div className="row">
                        <div className="col"><h4>New exercise</h4><hr className="myhr" /></div>
                    </div>
                    <div className="row bottomspace">
                        <div className="col">
                            <p id="radioHeadings">Select the type of components exercise</p>
                            <div className="divRadio">
                                <label className="labelRadio">
                                    <input type="radio" className="form-check-input" name="optradio" id="radioClient" onClick={this.clientRadioButtonListener} />Client component
                                </label>
                                <label>
                                    <input type="radio" className="form-check-input" name="optradio" id="radioClientServer" onClick={this.clientserverRadioButtonListener} />Both Client and Server components
                                </label>
                            </div>
                        </div>
                    </div>
                    {this.renderFileUpload()}
                    <div className="row paddingLeft15">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleAddQuestionButtonListener}>Add Question</button>
                    </div>
                    <p id="pQuestionValidatorFeedback" className="paddingLeft15 bottomspace redWarning"></p>
                    <div className="container">
                        {rowsWithQuestions}
                    </div>
                    <div className="textright bottomspace">
                        <button className="mybtn" onClick={this.addExercise}>Create Exercise</button>
                    </div>
                </div>
                <div className="otherFooter"><Footer /></div>
            </div>
        )
    }
}
export default ExercisesManagement