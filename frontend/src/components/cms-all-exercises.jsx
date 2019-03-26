import React, { Component } from 'react'
import Logo from './logo'
import FileUpload from './fileupload'
import Footer from './footer'
import Question from './exercisequestion'
import Collapse from './collapse'
import axios from 'axios'

var rowsWithQuestions = []
class ListExercises extends Component {
    state = {
        hasAddedNewQuestion: false,
        validForm: false,
        uploadedFile: '',
        questionList: "",
        selectedExerciseID: "",
        selectedExerciseFile: "",
        selectedExerciseName: "",
        selectedExerciseType: "",
        dir: '',
        hasDeletedQuestion: false
    }

    updateExercise = () => {
        if (this.isValidForm()) {
            var listOfQuestions = this.getListOfQuestions()
            var path = this.state.dir
            var exerciseID = this.state.selectedExerciseID
            var data = { uploadedfile: path, id: exerciseID, questions: listOfQuestions }
            var jsonData = JSON.stringify(data);
            //console.log(jsonData)
            axios.put('http://localhost:5000/exercise', jsonData, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    //console.log(response.data)
                    this.setState({
                        hasAddedNewQuestion: false,
                        validForm: false,
                        uploadedFile: '',
                        questionList: "",
                        selectedExerciseID: "",
                        selectedExerciseFile: "",
                        selectedExerciseName: "",
                        selectedExerciseType: "",
                        dir: '',
                        hasDeletedQuestion: false
                    })
                })
        }
    }

    deleteExercise() {
        axios.delete('http://localhost:5000/exercise?exerciseid=' + this.state.selectedExerciseID)
            .then(response => {
                //console.log(response.data)
                this.setState({
                    hasAddedNewQuestion: false,
                    validForm: false,
                    uploadedFile: '',
                    questionList: "",
                    selectedExerciseID: "",
                    selectedExerciseFile: "",
                    selectedExerciseName: "",
                    selectedExerciseType: "",
                    dir: '',
                    hasDeletedQuestion: false
                })
            })
    }

    isValidForm() {
        var valid = true

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
            //this.setState({ dir: document.getElementById("hid").value })
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

    renderFileUpload() {
        if (this.state.selectedExerciseType === "client") {
            return (
                <div className="row bottomspace marginLeft-15">
                    <FileUpload uploadedFile={this.setPath} colClass={"col"} fileUploadHeadings='Upload new Web Service as .zip file' regularUser={false}></FileUpload>
                </div>
            )
        }
        else if (this.state.selectedExerciseType === "clientserver") {
            return (
                <div className="row bottomspace marginLeft-15">
                    <FileUpload uploadedFile={this.setPath} colClass={"col"} fileUploadHeadings='Upload new dummy Client and a dummy Server as .zip file' regularUser={false}></FileUpload>
                </div>
            )
        }
    }

    setExercise = (exercise) => {
        this.setState({
            questionList: exercise.questionList,
            selectedExerciseID: exercise.id,
            selectedExerciseFile: exercise.file,
            selectedExerciseName: exercise.name,
            selectedExerciseType: exercise.type
        })
    }

    getEditor() {
        if (this.state.selectedExerciseID !== "") {
            var type
            if (this.state.selectedExerciseType == "client") {
                type = "Client Component"
            }
            else if (this.state.selectedExerciseType == "clientserver") {
                type = "Both Client and Server Components"
            }

            var fileName = this.state.selectedExerciseFile.split("/")
            //var rowsWithQuestions = []
            if (this.state.hasDeletedQuestion == false) {
                var listOfQuestions = this.state.questionList

                for (var i = 0; i < listOfQuestions.length; i++) {
                    var question = listOfQuestions[i]

                    rowsWithQuestions.push(<Question key={i}
                        id={i}
                        removeQuestion={this.removeQuestion}
                        title={question.title}
                        description={question.description} />)
                }
            }
            return (
                <div className="col">
                    <div className="row">
                        <div className="col"><h4>Edit exercise</h4><hr className="myhr" /></div>
                    </div>
                    <div className="row bottomspace">
                        <div className="col">Type of components exercise: <strong>{type}</strong></div>
                    </div>

                    <div className="row bottomspace">
                        <div className="col">Attached file: <a>{fileName[1]}</a> </div>
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
                        <button className="mybtn" onClick={this.deleteExercise}>Delete Exercise</button> <button className="mybtn" onClick={this.updateExercise}>Save Exercise</button>
                    </div>
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
        // The following line prevents the getEditor() function to relod the array rowsWithQuestions the questions on the "this.state.questionList"
        this.setState({ hasDeletedQuestion: true })
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
        this.setState({ hasDeletedQuestion: true }) // this is just to trigger the render method
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4">
                        <Logo></Logo>
                    </div>
                </div>
                <div className="container collapseContainer">
                    <h2 className="myh2">Exercises</h2>
                    <div className="row marginLeft0">
                        <div className="col-sm-5 collapseColumn">
                            <Collapse setExercise={this.setExercise} />
                        </div>
                        {this.getEditor()}
                    </div>
                </div>
                <div className="otherFooter"><Footer /></div>
            </div>
        )
    }
}
export default ListExercises