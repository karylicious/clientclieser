import React, { Component } from 'react'
import Logo from './logo'
import Footer from './footer'
import Question from './exercisequestion'
import axios from 'axios'
import Modal from './modal'
import ModalContent from './modalcontent'
import NewExerciseForm from './cms-new-exercise-form'

var rowsWithQuestions = []
var clieserRestApiHostName = 'https://clieser-restapi.herokuapp.com'

export default class NewExercise extends Component {

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
        hasNewExerciseBeenCreated: false,
        isLoggedIn: false
    }

    handleAddExercise = () => {

        if (this.isValidForm()) {

            var listOfQuestionsObjects = this.getListOfQuestionObjects()
            var data = {
                uploadedfile: this.state.dir,
                description: document.getElementById("description").value,
                type: this.state.typeOfExercise,
                selectedFileName: this.state.uploadedFileName,
                expectedcliententrypoint: document.getElementById("expectedClientEntryPoint").value.trim(),
                questions: listOfQuestionsObjects
            }

            var jsonData = JSON.stringify(data)

            this.setState({ displayWaitImage: true })

            axios.post(clieserRestApiHostName + '/exercise', jsonData, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    var message, hasSucceed
                    if (response.data["succeed"] === true) {
                        message = "Exercise has been created successfully."
                        hasSucceed = true
                        this.setState({ questionListRows: '' })
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

        var allElements = document.getElementsByClassName("question")

        if (allElements.length === 0) {
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

        if (valid) {
            this.setState({
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
                expectedoutput: listExpectedOuput[i].value.trim(),
                points: listPoints[i].value.trim(),
                expectedinvokedmethod: listExpectedInvokedMethod[i].value.trim()
            })

            rows.push(
                <Question key={i}
                    id={i}
                    title={listTitle[i].value}
                    description={listDescr[i].value}
                    expectedoutput={listExpectedOuput[i].value.trim()}
                    points={listPoints[i].value.trim()}
                    removeQuestion={this.removeQuestion}
                    expectedinvokedmethod={listExpectedInvokedMethod[i].value.trim()}
                />
            )
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

    handleCloseModal = () => {
        document.getElementById('modal-root').style.display = "none"
        this.setState({ displayModal: false })

        if (this.state.hasNewExerciseBeenCreated === true) {
            this.returnToListView()
        }
    }

    returnToListView = () => {
        const { username } = this.props.match.params
        this.props.history.push("/cms/all-exercises/" + username)
    }

    handleAddQuestionButtonListener = () => {
        document.getElementById("pQuestionValidatorFeedback").innerHTML = ""
        rowsWithQuestions.push(
            <Question
                key={rowsWithQuestions.length}
                id={rowsWithQuestions.length}
                title=""
                description=""
                expectedoutput=""
                points=""
                removeQuestion={this.removeQuestion}
                expectedinvokedmethod=""
            />
        )
        this.setState({ hasAddedNewQuestion: true, questionListRows: '' })
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

            newArray.push(
                <Question key={i}
                    id={i}
                    removeQuestion={this.removeQuestion}
                    title={question.title}
                    description={question.description}
                    expectedoutput={question.expectedoutput}
                    expectedinvokedmethod={question.expectedinvokedmethod}
                    points={question.points}
                />
            )
        }
        rowsWithQuestions = newArray
        this.setState({ hasAddedNewQuestion: false, displayModal: false, questionListRows: '' })
    }

    componentDidMount() {
        if (this.state.displayModal === false) {
            document.getElementById('modal-root').classList.add("modal")
            document.getElementById('modal-root').style.display = "none"
        }

        this.setState({ questionListRows: '' })
        rowsWithQuestions = []

        /*const { username } = this.props.match.params

        axios.get(clieserRestApiHostName + '/session?username=' + username)
            .then(response => {
                if (response.data['loggedin']) {
                    this.setState({ isLoggedIn: true })
                }
            })*/
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


    renderForm = () => {
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

            return <NewExerciseForm
                rowsWithQuestions={rowsWithQuestions}
                selectedComponent={this.state.selectedComponent}
                setPath={this.setPath}
                clientRadioButtonListener={this.clientRadioButtonListener}
                clientserverRadioButtonListener={this.clientserverRadioButtonListener}
                expectedcliententrypoint={this.state.expectedClientEntryPoint}
                description={this.state.description}
                handleAddQuestionButtonListener={this.handleAddQuestionButtonListener}
                displayConfirmationDialog={this.displayConfirmationDialog}
                handleAddExercise={this.handleAddExercise} />
        }
    }

    render() {
        /*if (!this.state.isLoggedIn) {
            const { username } = this.props.match.params

            axios.get(clieserRestApiHostName + '/session?username=' + username)
                .then(response => {
                    if (!response.data['loggedin']) {
                        this.props.history.push("/cms")
                    }
                })
        }*/

        return (
            <div>
                <div className="row">
                    <div className="col-sm-4"><Logo /></div>
                </div>
                <div className="container">
                    <h2 className="myh2">Exercises</h2>
                    <div className="row">
                        <div className="col"><h4>New exercise</h4><hr className="myhr" /></div>
                    </div>
                    {this.renderForm()}
                </div>
                <Footer />
                <Modal children={
                    <ModalContent
                        title={this.state.modalTitle}
                        message={this.state.modalMessage}
                        isConfirmationModalType={this.state.isConfirmationModalType}
                        handleCloseModal={this.handleCloseModal}
                        handleConfirmation={this.returnToListView} />
                } />
            </div>
        )
    }
} 