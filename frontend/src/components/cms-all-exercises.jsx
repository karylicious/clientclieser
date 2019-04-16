import React, { Component } from 'react'
import Logo from './logo'
import Footer from './footer'
import Question from './exercisequestion'
import Collapse from './collapse-exercises'
import axios from 'axios'
import Modal from './modal'
import ModalContent from './modalcontent'
import EditExerciseForm from './cms-edit-exercise-form'

var rowsWithQuestions = []
var clieserRestApiHostName = 'https://clieser-restapi.herokuapp.com'

export default class ListExercises extends Component {
    state = {
        hasAddedNewQuestion: false,
        validForm: false,
        uploadedFileName: "",
        questionList: [],
        selectedExerciseID: "",
        selectedExerciseFile: "",
        selectedExerciseType: "",
        selectedExerciseExpectedClientEntryPoint: "",
        selectedExerciseDescription: "",
        dir: "",
        hasDeletedQuestion: false,
        hasSelectedExercise: false,
        exerciseList: [],
        resetUploadFileComponent: false,
        displayModal: false,
        modalTitle: '',
        modalMessage: '',
        isConfirmationModalType: false,
        displayWaitImage: false,
        displayPasswordManagementPanel: false,
        displayWarningPasswordEmpty: false,
        isLoggedIn: false
    }

    handleUpdateExercise = () => {
        if (this.isValidForm()) {

            var listOfQuestionsObjects = this.getListOfQuestionObjects()

            var data = {
                type: this.state.selectedExerciseType,
                uploadedfile: this.state.dir,
                description: document.getElementById("description").value,
                selectedFileName: this.state.uploadedFileName,
                expectedClientEntryPoint: document.getElementById("expectedClientEntryPoint").value.trim(),
                id: this.state.selectedExerciseID,
                questions: listOfQuestionsObjects
            }

            var jsonData = JSON.stringify(data);

            this.setState({ displayWaitImage: true })

            axios.put(clieserRestApiHostName + '/exercise', jsonData, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    window.scrollTo(0, 0)

                    var message
                    if (response.data["succeed"] === true) {
                        message = "Exercise has been updated successfully."
                        if (this.state.uploadedFileName !== "")
                            this.setState({
                                resetUploadFileComponent: true,
                                selectedExerciseFile: this.state.dir,
                                dir: "",
                                uploadedFileName: ""
                            })
                    }
                    else if (response.data["succeed"] === false) {
                        message = response.data["info"]
                        if (this.state.uploadedFileName !== "")
                            this.setState({ resetUploadFileComponent: true, dir: "", uploadedFileName: "" })
                    }

                    this.setState({
                        displayModal: true,
                        modalTitle: 'Notification',
                        modalMessage: message,
                        isConfirmationModalType: false,
                        displayWaitImage: false,
                        hasDeletedQuestion: false
                    })

                    axios.get(clieserRestApiHostName + '/exercisequestion?exerciseid=' + this.state.selectedExerciseID)
                        .then(response => {
                            this.setState({
                                questionList: response.data
                            })
                        })
                })
        }
    }

    setResetUploadFileComponent = () => {
        this.setState({ resetUploadFileComponent: false, displayModal: false })
    }

    displayConfirmationDialog = () => {
        this.setState({
            displayModal: true,
            modalTitle: 'Delete Exercise',
            modalMessage: 'Are you sure you want to delete this exercise?',
            isConfirmationModalType: true,
            displayWaitImage: false
        })
    }

    handleDownloadFile = () => {
        axios.get(clieserRestApiHostName + '/zipfile?file=' + this.state.selectedExerciseFile)
            .then(response => {
                if (response.data["succeed"] === false) {
                    this.setState({
                        displayModal: true,
                        modalTitle: 'Notification',
                        modalMessage: 'File not found.',
                        isConfirmationModalType: false,
                        displayWaitImage: false
                    })
                }
                else {
                    var MIME_TYPE = "application/x-zip-compressed"

                    // A Blob object represents a file-like object of immutable, raw data
                    var blob = new Blob([response.data], { type: MIME_TYPE })

                    var link = document.createElement('a')
                    // convert byte array into blob
                    link.href = window.URL.createObjectURL(blob)

                    // set its name to the actual file name
                    var fileName = this.state.selectedExerciseFile.split("/")
                    link.download = fileName[1]

                    // triggers automatic download
                    link.click()
                }
            })
    }

    handleDeleteExercise = () => {
        this.handleCloseModal()
        this.setState({ displayWaitImage: true })

        axios.delete(clieserRestApiHostName + '/exercise?exerciseid=' + this.state.selectedExerciseID)
            .then(response => {
                this.setState({
                    hasAddedNewQuestion: false,
                    validForm: false,
                    uploadedFileName: '',
                    questionList: [],
                    selectedExerciseID: "",
                    selectedExerciseFile: "",
                    selectedExerciseType: "",
                    selectedExerciseExpectedClientEntryPoint: "",
                    selectedExerciseDescription: "",
                    dir: '',
                    hasDeletedQuestion: false,
                    displayModal: true,
                    modalTitle: 'Notification',
                    modalMessage: "Exercise has been deleted successfully.",
                    isConfirmationModalType: false,
                    displayWaitImage: false
                })

                var elements = document.getElementsByClassName("myCollapseActive")
                if (elements.length === 1)
                    elements[0].classList.remove("myCollapseActive")

                axios.get(clieserRestApiHostName + '/exercise')
                    .then(response => {
                        this.setState({ exerciseList: response.data });
                    })
            })
    }

    isValidForm() {
        var valid = true
        var allElements = document.getElementsByClassName("form-control")

        // (allElements.length == 4) means the two input fields of the exercise details and the two inputs of the change of password form
        if (allElements.length === 4) {
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
        else
            document.getElementById("description").classList.remove("is-invalid")

        var entryPoint = document.getElementById("expectedClientEntryPoint").value

        if (entryPoint.trim() === '') {
            document.getElementById("expectedClientEntryPoint").className += " is-invalid"
            valid = false
        }
        else
            document.getElementById("expectedClientEntryPoint").classList.remove("is-invalid")

        if (document.getElementById("fileChooserTextField").classList.contains("is-invalid"))
            valid = false

        if (valid) {
            this.setState({
                selectedExerciseDescription: descriptionOfExercise,
                selectedExerciseExpectedClientEntryPoint: entryPoint
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
                expectedOutput: listExpectedOuput[i].value.trim(),
                points: listPoints[i].value.trim(),
                expectedInvokedMethod: listExpectedInvokedMethod[i].value.trim()
            })
        }
        return listOfQuestionObjects
    }

    renderPanelManagement = () => {
        const { username } = this.props.match.params
        this.props.history.push("/cms/management/" + username)
    }

    getExerciseByID = (id) => {
        if (this.state.dir !== "")
            this.setState({ resetUploadFileComponent: true, dir: "", uploadedFileName: "" })

        axios.get(clieserRestApiHostName + '/exercise?exerciseid=' + id)
            .then(response => {

                this.setState({
                    selectedExerciseID: id,
                    selectedExerciseFile: response.data['uploadedfile'],
                    selectedExerciseType: response.data['exerciseType'],
                    selectedExerciseExpectedClientEntryPoint: response.data['expectedClientEntryPoint'],
                    selectedExerciseDescription: response.data['description'],
                    hasSelectedExercise: true,
                    hasDeletedExercise: false,
                    hasDeletedQuestion: false,
                    resetUploadFileComponent: false,
                    displayModal: false
                })

                axios.get(clieserRestApiHostName + '/exercisequestion?exerciseid=' + id)
                    .then(response => {
                        this.setState({
                            questionList: response.data
                        })
                    })
            })
    }

    componentDidUpdate() {
        if (this.state.hasSelectedExercise === true) {

            document.getElementById("expectedClientEntryPoint").value = this.state.selectedExerciseExpectedClientEntryPoint
            document.getElementById("description").value = this.state.selectedExerciseDescription

            var fileName = this.state.selectedExerciseFile.split("/")
            document.getElementById("attachedFileName").innerHTML = fileName[1]

            this.setState({ hasSelectedExercise: false })
        }

        if (this.state.displayWarningPasswordEmpty)
            document.getElementById('pWarning').innerHTML = "No password is set! This system is at risk. Set a password."
        else
            document.getElementById('pWarning').innerHTML = ""
    }

    renderForm() {
        if (this.state.displayWaitImage === true) {
            return (
                <div className="col">
                    <i id="loadSpinner" className="fa fa-spinner fa-spin" />
                    <p>Please wait...</p>
                </div>
            )
        }
        else if (this.state.selectedExerciseID === "") {
            return (
                <div className="col">
                    <p>Here you can edit your exercises!</p>
                    <div className="bottomRight">
                        <button className="mybtn" onClick={this.renderPanelManagement}>Return</button>
                    </div>
                </div>
            )
        }
        else if (this.state.selectedExerciseID !== "") {
            var type
            if (this.state.selectedExerciseType === "client")
                type = "Client Component"

            else if (this.state.selectedExerciseType === "clientserver")
                type = "Both Client and Server Components"

            if (this.state.displayModal === true)
                document.getElementById('modal-root').style.display = "block"

            var fileName = this.state.selectedExerciseFile.split("/")

            if (this.state.hasDeletedQuestion === false) {
                rowsWithQuestions = []
                var listOfQuestionObjects = this.state.questionList

                for (var i = 0; i < listOfQuestionObjects.length; i++) {
                    var question = listOfQuestionObjects[i]

                    rowsWithQuestions.push(
                        <Question
                            key={i}
                            id={i}
                            removeQuestion={this.removeQuestion}
                            title={question.title}
                            description={question.description}
                            expectedOutput={question.expectedOutput}
                            expectedInvokedMethod={question.expectedInvokedMethod}
                            points={question.points}
                        />
                    )
                }
            }

            return <EditExerciseForm
                rowsWithQuestions={rowsWithQuestions}
                selectedExerciseType={this.state.selectedExerciseType}
                setPath={this.setPath}
                resetUploadFileComponent={this.state.resetUploadFileComponent}
                setResetUploadFileComponent={this.setResetUploadFileComponent}
                type={type}
                fileName={fileName[1]}
                selectedExerciseExpectedClientEntryPoint={this.state.selectedExerciseExpectedClientEntryPoint}
                selectedExerciseDescription={this.state.selectedExerciseDescription}
                handleAddQuestionButtonListener={this.handleAddQuestionButtonListener}
                displayConfirmationDialog={this.displayConfirmationDialog}
                handleUpdateExercise={this.handleUpdateExercise}
                handleDownloadFile={this.handleDownloadFile}
                renderPanelManagement={this.renderPanelManagement}
            />
        }
    }

    handleCloseModal() {
        document.getElementById('modal-root').style.display = "none"
    }

    handleNewExercise = () => {
        if (this.state.displayWaitImage === false) {
            const { username } = this.props.match.params
            this.props.history.push("/cms/new-exercise/" + username)
        }
    }

    handleAddQuestionButtonListener = () => {
        document.getElementById("pQuestionValidatorFeedback").innerHTML = ""
        rowsWithQuestions.push(
            <Question
                key={rowsWithQuestions.length}
                id={rowsWithQuestions.length}
                title=""
                description=""
                expectedOutput=""
                points=""
                removeQuestion={this.removeQuestion}
                expectedInvokedMethod=""
            />
        )

        // The following line prevents the renderForm() function to reload the array rowsWithQuestions with 
        // the questions on the "this.state.questionList" variable
        this.setState({ hasDeletedQuestion: true, displayModal: false })
    }

    setPath = (path, fileName) => {
        this.setState({ dir: path, uploadedFileName: fileName })
    }

    handleLogout = () => {
        this.props.history.push("/cms")
    }

    handlePasswordUpdate = () => {
        if (this.isValidPasswordChangeForm()) {
            const { username } = this.props.match.params
            var password = document.getElementById("password").value

            axios.put(clieserRestApiHostName + '/user?username=' + username + "&password=" + password)
                .then(response => {
                    if (!response.data['succeed']) {
                        this.setState({
                            displayModal: true,
                            modalTitle: 'Notification',
                            modalMessage: response.data['info'],
                            isConfirmationModalType: false
                        })
                    }
                    else if (response.data['succeed']) {
                        this.setState({
                            displayModal: true,
                            modalTitle: 'Notification',
                            modalMessage: "Password has been changed successfuly",
                            isConfirmationModalType: false,
                            displayPasswordManagementPanel: false,
                            displayWarningPasswordEmpty: false
                        })
                    }

                })
        }
    }

    isValidPasswordChangeForm() {
        var valid = true
        var password = document.getElementById("password").value

        if (password.trim() === '') {
            document.getElementById("password").className += " is-invalid"
            valid = false
        }
        else
            document.getElementById("password").classList.remove("is-invalid")

        var passwordAgain = document.getElementById("passwordAgain").value

        if (passwordAgain.trim() === '') {
            document.getElementById("passwordAgain").className += " is-invalid"
            valid = false
        }
        else
            document.getElementById("passwordAgain").classList.remove("is-invalid")

        if (valid) {
            if (password !== passwordAgain) {
                document.getElementById("pFeedback").innerHTML = "Passwords don't match!"
                valid = false
            }
            else
                document.getElementById("pFeedback").innerHTML = ""
        }
        return valid
    }

    handlePasswordManagemet = () => {
        if (this.state.displayPasswordManagementPanel)
            this.setState({ displayPasswordManagementPanel: false })

        else if (!this.state.displayPasswordManagementPanel)
            this.setState({ displayPasswordManagementPanel: true })
    }
    renderPasswordManagementPanel() {
        if (this.state.displayModal === true)
            document.getElementById('modal-root').style.display = "block"

        if (this.state.displayPasswordManagementPanel) {
            return (
                <div className="effectShadow bottomspace padding20">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label>New Password</label>
                                <input className="form-control myinputtext" id="password" type="password" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Re-enter New Password</label>
                                <input className="form-control myinputtext" id="passwordAgain" type="password" />
                            </div>
                        </div>
                        <p className="redWarning" id="pFeedback"></p>
                        <div className="textright">
                            <button className="btn btn-outline-secondary" onClick={this.handlePasswordUpdate}>Confirm</button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    removeQuestion = (listOfQuestionObjects) => {
        var newArray = []
        for (var i = 0; i < listOfQuestionObjects.length; i++) {

            var question = listOfQuestionObjects[i]
            newArray.push(
                <Question
                    key={i}
                    id={i}
                    removeQuestion={this.removeQuestion}
                    title={question.title}
                    description={question.description}
                    expectedOutput={question.expectedOutput}
                    expectedInvokedMethod={question.expectedInvokedMethod}
                    points={question.points}
                />
            )
        }
        rowsWithQuestions = newArray
        this.setState({ hasDeletedQuestion: true })
    }

    componentDidMount() {
        if (this.state.displayModal === false) {
            document.getElementById('modal-root').classList.add("modal")
            document.getElementById('modal-root').style.display = "none"
        }

        const { username } = this.props.match.params

        axios.get(clieserRestApiHostName + '/exercise')
            .then(response => {
                this.setState({ exerciseList: response.data })

                // Verify whether the admin has the password empty
                axios.get(clieserRestApiHostName + '/user?username=' + username + "&password=")
                    .then(response => {
                        if (response.data['succeed'])
                            this.setState({ displayWarningPasswordEmpty: true, isLoggedIn: true })
                    })
            })
    }

    render() {
        if (!this.state.isLoggedIn) {
            const { username } = this.props.match.params

            axios.get(clieserRestApiHostName + '/session?username=' + username)
                .then(response => {
                    if (!response.data['loggedin'])
                        this.props.history.push("/cms")
                })
        }
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4"><Logo /></div>
                    <div className="col">
                        <div className="row alignRight">
                            <button className="btn btn-outline-secondary marginRight10" type="button" onClick={this.handlePasswordManagemet}>Change Password</button> <button className="btn btn-outline-secondary" type="button" onClick={this.handleLogout}>Logout</button>
                        </div>
                        <div className="row alignRight">
                            {this.renderPasswordManagementPanel()}
                        </div>
                        <div className="row alignRight">
                            <p className="redWarning" id="pWarning"></p>
                        </div>
                    </div>
                </div>
                <div className="container collapseContainer">
                    <h2 className="myh2">Exercises</h2>
                    <div className="row alignRight">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleNewExercise}>New Exercise</button>
                    </div>
                    <div className="row marginLeft0">
                        <div className="col-sm-5 collapseColumn">
                            <Collapse
                                getExerciseByID={this.getExerciseByID}
                                exerciseList={this.state.exerciseList}
                            />
                        </div>
                        {this.renderForm()}
                    </div>
                </div>
                <Footer />
                <Modal children={
                    <ModalContent
                        title={this.state.modalTitle}
                        message={this.state.modalMessage}
                        isConfirmationModalType={this.state.isConfirmationModalType}
                        handleCloseModal={this.handleCloseModal}
                        handleConfirmation={this.handleDeleteExercise} />
                }/>
            </div>
        )
    }
} 