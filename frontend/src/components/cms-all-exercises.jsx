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
        selectedExerciseExpectedClientEntryPoint: "",
        selectedExerciseDescription: "",
        dir: '',
        hasDeletedQuestion: false,
        hasSelectedExercise: false,
        exerciseList: ''
    }

    updateExercise = () => {
        if (this.isValidForm()) {

            var listOfQuestionsObjects = this.getListOfQuestionObjects()
            var path = this.state.dir
            var exerciseID = this.state.selectedExerciseID
            var selectedFile = this.state.uploadedFile.split(".zip")

            var data = {
                uploadedfile: path,
                description: this.state.description,
                selectedFileName: selectedFile[0],
                expectedClientEntryPoint: this.state.expectedClientEntryPoint,
                id: exerciseID,
                questions: listOfQuestionsObjects
            }

            var jsonData = JSON.stringify(data);

            axios.put('http://localhost:5000/exercise', jsonData, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    //console.log(response.data)
                    this.setState({
                        hasSelectedExercise: true
                        /*hasAddedNewQuestion: false,
                        validForm: false,
                        uploadedFile: '',
                        questionList: "",
                        //selectedExerciseID: "",
                        selectedExerciseFile: "",
                        selectedExerciseName: "",
                        selectedExerciseType: "",
                        selectedExerciseExpectedClientEntryPoint: "",
                        selectedExerciseDescription: "",
                        dir: '',
                        hasDeletedQuestion: false,*/
                        //hasSelectedExercise: false
                    })
                })
        }
    }

    deleteExercise = () => {
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
                    selectedExerciseExpectedClientEntryPoint: "",
                    selectedExerciseDescription: "",
                    dir: '',
                    hasDeletedQuestion: false,
                    hasSelectedExercise: false
                })

                axios.get('http://localhost:5000/exercise')
                    .then(response => {
                        this.setState({ exerciseList: response.data });
                    })
            })
    }

    isValidForm() {
        var valid = true
        var allElements = document.getElementsByClassName("form-control")

        // (allElements.length == 2) 2 means the two input fields of the exercise details
        if (allElements.length == 2) {
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

        var descriptionOfExercise = document.getElementById("description").value

        if (descriptionOfExercise.trim() === '') {
            document.getElementById("description").className += " is-invalid"
            valid = false
        }
        else {
            document.getElementById("description").classList.remove("is-invalid")
        }


        var entryPoint = document.getElementById("expectedClientEntryPoint").value

        if (entryPoint.trim() === '') {
            document.getElementById("expectedClientEntryPoint").className += " is-invalid"
            valid = false
        }
        else {
            document.getElementById("expectedClientEntryPoint").classList.remove("is-invalid")
        }

        if (valid) {
            var fileName = document.getElementById("fileChooserLabel").innerHTML
            this.setState({
                uploadedFile: fileName,
                expectedClientEntryPoint: entryPoint,
                description: descriptionOfExercise
            })
        }

        return valid
    }

    getListOfQuestionObjects() {
        var listTitle = document.getElementsByClassName("questiontitle")
        var listDescr = document.getElementsByClassName("questiondescription")
        var listExpectedOuput = document.getElementsByClassName("questionexpectedoutput")
        var listPoints = document.getElementsByClassName("questionpoints")
        var listExpectedInvokedMethod = document.getElementsByClassName("questionexpectedinvokedmethod")
        var listOfQuestionObjects = []

        for (var i = 0; i < listTitle.length; i++) {
            listOfQuestionObjects.push({
                title: listTitle[i].value,
                description: listDescr[i].value,
                expectedOutput: listExpectedOuput[i].value,
                points: listPoints[i].value,
                expectedInvokedMethod: listExpectedInvokedMethod[i].value
            })
        }
        return listOfQuestionObjects
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

    getExerciseByID = (id) => {
        axios.get('http://localhost:5000/exercise?exerciseid=' + id)
            .then(response => {
                this.setState({
                    selectedExerciseID: id,
                    selectedExerciseFile: response.data['uploadedfile'],
                    selectedExerciseName: response.data['name'],
                    selectedExerciseType: response.data['exerciseType'],
                    selectedExerciseExpectedClientEntryPoint: response.data['expectedClientEntryPoint'],
                    selectedExerciseDescription: response.data['description'],
                    hasSelectedExercise: true,
                    hasDeletedExercise: false
                })

                axios.get('http://localhost:5000/exercisequestion?exerciseid=' + id)
                    .then(response => {
                        this.setState({
                            questionList: response.data
                        })
                    })
            })
    }

    componentDidUpdate() {
        if (this.state.hasSelectedExercise == true) {
            document.getElementById("description").value = this.state.selectedExerciseDescription
            document.getElementById("expectedClientEntryPoint").value = this.state.selectedExerciseExpectedClientEntryPoint
        }
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

            if (this.state.hasSelectedExercise == true) {
                rowsWithQuestions = []
            }

            if (this.state.hasDeletedQuestion == false) {
                var listOfQuestionObjects = this.state.questionList

                for (var i = 0; i < listOfQuestionObjects.length; i++) {
                    var question = listOfQuestionObjects[i]

                    rowsWithQuestions.push(<Question key={i}
                        id={i}
                        removeQuestion={this.removeQuestion}
                        title={question.title}
                        description={question.description}
                        expectedOutput={question.expectedOutput}
                        expectedInvokedMethod={question.expectedInvokedMethod}
                        points={question.points} />)
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
                    <div className="row">
                        <div className="col">
                            <label>Expected name of the class with the main method and its package of a Client <span className="systemwarning"> (E.g com.example.MyMainClass)</span></label>
                            <input className="form-control myinputtext" id="expectedClientEntryPoint" type="text" defaultValue={this.state.selectedExerciseExpectedClientEntryPoint} />
                        </div>
                    </div>
                    <div className="row bottomspace">
                        <div className="col">
                            <label>Description</label>
                            <textarea className="form-control" id="description" rows="3" defaultValue={this.state.selectedExerciseDescription}></textarea>
                        </div>
                    </div>
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
            expectedOutput=""
            points=""
            removeQuestion={this.removeQuestion}
            expectedInvokedMethod="" />)
        // The following line prevents the getEditor() function to reload the array rowsWithQuestions with the questions on the "this.state.questionList" variable
        this.setState({ hasDeletedQuestion: true })
    }

    setPath = (path) => {
        this.setState({ dir: path })
    }

    removeQuestion = (listOfQuestionObjects) => {
        var newArray = []
        for (var i = 0; i < listOfQuestionObjects.length; i++) {
            var question = listOfQuestionObjects[i]
            newArray.push(<Question key={i}
                id={i}
                removeQuestion={this.removeQuestion}
                title={question.title}
                description={question.description}
                expectedOutput={question.expectedOutput}
                expectedInvokedMethod={question.expectedInvokedMethod}
                points={question.points} />)
        }
        rowsWithQuestions = newArray
        this.setState({ hasDeletedQuestion: true }) // this is just to trigger the render method
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercise')
            .then(response => {
                this.setState({ exerciseList: response.data });
            })
    }


    render() {
        console.log(this.state.exerciseList)
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
                            <Collapse getExerciseByID={this.getExerciseByID} exerciseList={this.state.exerciseList} />
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