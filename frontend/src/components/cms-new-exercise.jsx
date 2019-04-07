import React, { Component } from 'react'
import Logo from './logo'
import FileUpload from './fileupload'
import Footer from './footer'
import Question from './exercisequestion'
import axios from 'axios'
import Modal from './modal'
import ModalContent from './modalcontent'

var rowsWithQuestions = []
class NewExercise extends Component {
    state = {
        hasAddedNewQuestion: false,
        validForm: false,
        uploadedFileName: '',
        questionListRows: "",
        dir: '',
        typeOfExercise: '',
        description: '',
        expectedClientEntryPoint: '',
        displayModal: false,
        modalTitle: '',
        modalMessage: '',
        isConfirmationModalType: false,
        displayWaitImage: false,
        hasNewExerciseBeenCreated: false
    }

    addExercise = () => {

        if (this.isValidForm()) {

            var listOfQuestionsObjects = this.getListOfQuestionObjects()
            //var path = this.state.dir
            //var selectedFile = this.state.uploadedFile.split(".zip")

            var data = {
                uploadedfile: this.state.dir,
                description: document.getElementById("description").value,
                type: this.state.typeOfExercise,
                selectedFileName: this.state.uploadedFileName,
                expectedClientEntryPoint: document.getElementById("expectedClientEntryPoint").value,
                questions: listOfQuestionsObjects
            }

            var jsonData = JSON.stringify(data)

            this.setState({ displayWaitImage: true })

            axios.post('http://localhost:5000/exercise', jsonData, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    var message, hasSucceed
                    if (response.data["succeed"] === true) {
                        message = "Exercise has been created successfully."
                        hasSucceed = true
                    }
                    else if (response.data["succeed"] === false) {
                        message = response.data["info"]
                        hasSucceed = false
                    }

                    this.setState({
                        displayModal: true,
                        modalTitle: 'Notification',
                        modalMessage: message,
                        isConfirmationModalType: false,
                        displayWaitImage: false,
                        hasNewExerciseBeenCreated: hasSucceed
                    })
                    console.log(this.state)
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
                document.getElementById("fileChooserTextField").classList.remove("is-invalid")
                var value = document.getElementById("uploadvalidation").innerHTML
                if (value !== '')
                    valid = false
            }
        }

        var allElements = document.getElementsByClassName("form-control")

        // (allElements.length == 2) 2 means the two input fields of the exercise details
        if (allElements.length === 2) {
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
            //This needs to be revised. compare it with the all exercises
            //var fileName = document.getElementById("fileChooserLabel").innerHTML
            this.setState({
                //uploadedFile: fileName,
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
        var rows = []

        for (var i = 0; i < listTitle.length; i++) {
            listOfQuestionObjects.push({
                title: listTitle[i].value,
                description: listDescr[i].value,
                expectedOutput: listExpectedOuput[i].value,
                points: listPoints[i].value,
                expectedInvokedMethod: listExpectedInvokedMethod[i].value
            })

            rows.push(<Question key={i}
                id={i}
                title={listTitle[i].value}
                description={listDescr[i].value}
                expectedOutput={listExpectedOuput[i].value}
                points={listPoints[i].value}
                removeQuestion={this.removeQuestion}
                expectedInvokedMethod={listExpectedInvokedMethod[i].value} />)
        }

        this.setState({ questionListRows: rows })
        return listOfQuestionObjects
    }

    clientRadioButtonListener = () => {
        document.getElementById("radioHeadings").classList.remove("redWarning")
        this.setState({ selectedComponent: 'client', typeOfExercise: 'client' })
    }

    clientserverRadioButtonListener = () => {
        document.getElementById("radioHeadings").classList.remove("redWarning")
        this.setState({ selectedComponent: 'both', typeOfExercise: 'clientserver' })
    }

    renderFileUpload() {
        if (this.state.selectedComponent === "client") {
            return (
                <div className="row bottomspace marginLeft-15">
                    <FileUpload uploadedFile={this.setPath} colClass={"col-sm-7"} fileUploadHeadings='Upload a complete Web Service as .zip file'></FileUpload>
                </div>
            )
        }
        else if (this.state.selectedComponent === "both") {
            return (
                <div className="row bottomspace marginLeft-15">
                    <FileUpload uploadedFile={this.setPath} colClass={"col-sm-7"} fileUploadHeadings='Upload a dummy Client and a dummy Server as .zip file'></FileUpload>
                </div>
            )
        }
    }

    handleCloseModal = () => {
        document.getElementById('modal-root').style.display = "none"
        if (this.state.hasNewExerciseBeenCreated === true) {
            this.returnToListView()
        }
    }

    returnToListView = () => {
        this.props.history.push("/cms/all-exercises");
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
        this.setState({ hasAddedNewQuestion: true, questionListRows: '' }) // this is just to trigger the render method
    }

    setPath = (path, fileName) => {
        this.setState({ dir: path, uploadedFileName: fileName })
    }

    displayConfirmationDialog = () => {
        this.setState({
            displayModal: true,
            modalTitle: 'Cancellation',
            modalMessage: 'Are you sure you want to leave this page?',
            isConfirmationModalType: true
        })
    }

    removeQuestion = (listOfQuestionsObjects) => {
        var newArray = []
        for (var i = 0; i < listOfQuestionsObjects.length; i++) {
            var question = listOfQuestionsObjects[i]

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
        this.setState({ hasAddedNewQuestion: false, displayModal: false, questionListRows: '' }) // this is just to trigger the render method
    }

    componentDidMount() {
        if (this.state.displayModal === false) {
            document.getElementById('modal-root').classList.add("modal")
            document.getElementById('modal-root').style.display = "none"
        }
    }

    componentDidUpdate() {
        if (this.state.displayModal === true) {
            document.getElementById('modal-root').style.display = "block"
            this.setState({ displayModal: false })

            if (this.state.hasNewExerciseBeenCreated === false) {
                if (this.state.typeOfExercise === 'client') {
                    document.getElementById("radioClient").checked = true
                    document.getElementById("radioClientServer").checked = false
                }
                else if (this.state.typeOfExercise === 'clientserver') {
                    document.getElementById("radioClient").checked = false
                    document.getElementById("radioClientServer").checked = true
                }
            }

        }

    }


    renderMiddleComponents = () => {
        if (this.state.displayWaitImage === true) {
            return (
                <div className="row">
                    <i id="loadSpinner" className="fa fa-spinner fa-spin" />
                    <p>Please wait...</p>
                </div>
            )
        }
        else if (this.state.hasNewExerciseBeenCreated === false) {
            if (this.state.questionListRows !== '')
                rowsWithQuestions = this.state.questionListRows
            return (
                <div>
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
                    <div className="row">
                        <div className="col">
                            <label>Expected name of the class with the main method and its package of a Client <span className="systemwarning"> (E.g com.example.MyMainClass)</span></label>
                            <input className="form-control myinputtext" id="expectedClientEntryPoint" type="text" defaultValue={this.state.expectedClientEntryPoint} />
                        </div>
                    </div>
                    <div className="row bottomspace">
                        <div className="col">
                            <label>Description</label>
                            <textarea className="form-control" id="description" rows="3" defaultValue={this.state.description} ></textarea>
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
                        <button className="mybtn" onClick={this.displayConfirmationDialog}>Cancel</button> <button className="mybtn" onClick={this.addExercise}>Create Exercise</button>
                    </div>
                </div>
            )
        }
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
                    {this.renderMiddleComponents()}
                </div>
                <div className="otherFooter"><Footer /></div>
                <Modal children={<ModalContent
                    title={this.state.modalTitle}
                    message={this.state.modalMessage}
                    isConfirmationModalType={this.state.isConfirmationModalType}
                    handleCloseModal={this.handleCloseModal}
                    handleConfirmation={this.returnToListView} />}>
                </Modal>
            </div>
        )
    }
}
export default NewExercise