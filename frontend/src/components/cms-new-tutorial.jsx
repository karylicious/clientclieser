import React, { Component } from 'react'
import Logo from './logo'
import Footer from './footer'
import Lesson from './lesson'
import axios from 'axios'
import Modal from './modal'
import ModalContent from './modalcontent'
import NewTutorialForm from './cms-new-tutorial-form'

var rowsWithLessons = []
var clieserRestApiHostName = 'https://clieser-restapi.herokuapp.com'

export default class NewTutorial extends Component {
    state = {
        hasAddedNewLesson: false,
        validForm: false,
        lessonListRows: "",
        title: '',
        displayModal: false,
        modalTitle: '',
        modalMessage: '',
        isConfirmationModalType: false,
        displayWaitImage: false,
        hasNewTutorialBeenCreated: false,
        isLoggedIn: false
    }

    handleAddTutorial = () => {

        if (this.isValidForm()) {
            var listOfLessonsObjects = this.getListOfLessonObjects()

            var data = {
                title: document.getElementById("title").value,
                lessons: listOfLessonsObjects
            }

            var jsonData = JSON.stringify(data)

            this.setState({ displayWaitImage: true })

            axios.post(clieserRestApiHostName + '/tutorial', jsonData, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    var message, hasSucceed
                    if (response.data["succeed"] === true) {
                        message = "Tutorial has been created successfully."
                        hasSucceed = true
                        this.setState({ lessonListRows: '' })
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
                        hasNewTutorialBeenCreated: hasSucceed
                    })
                })
        }
    }

    isValidForm() {
        var valid = true
        var allElements = document.getElementsByClassName("lesson")

        if (allElements.length === 0) {
            document.getElementById("pLessonValidatorFeedback").innerHTML = "Please add a lesson"
            valid = false
        }
        else {
            document.getElementById("pLessonValidatorFeedback").innerHTML = ""
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

        var titleOfTutorial = document.getElementById("title").value

        if (titleOfTutorial.trim() === '') {
            document.getElementById("title").className += " is-invalid"
            valid = false
        }
        else
            document.getElementById("title").classList.remove("is-invalid")

        if (valid) {
            this.setState({
                title: titleOfTutorial
            })
        }

        return valid
    }

    getListOfLessonObjects() {
        var listTitle = document.getElementsByClassName("lessontitle")
        var listDescr = document.getElementsByClassName("lessondescription")
        var listLink = document.getElementsByClassName("lessonlink")
        var listOfLessonObjects = []
        var rows = []

        for (var i = 0; i < listTitle.length; i++) {
            listOfLessonObjects.push({
                title: listTitle[i].value,
                description: listDescr[i].value,
                link: listLink[i].value
            })

            rows.push(
                <Lesson
                    key={i}
                    id={i}
                    title={listTitle[i].value}
                    description={listDescr[i].value}
                    link={listLink[i].value}
                />
            )
        }

        this.setState({ lessonListRows: rows })
        return listOfLessonObjects
    }

    handleCloseModal = () => {
        document.getElementById('modal-root').style.display = "none"
        this.setState({ displayModal: false })

        if (this.state.hasNewTutorialBeenCreated === true) {
            rowsWithLessons = []
            this.setState({ hasNewTutorialBeenCreated: false })
            this.returnToListView()
        }
    }

    returnToListView = () => {
        const { username } = this.props.match.params
        this.props.history.push("/cms/all-tutorials/" + username)
    }

    handleAddLessonButtonListener = () => {
        document.getElementById("pLessonValidatorFeedback").innerHTML = ""
        rowsWithLessons.push(
            <Lesson
                key={rowsWithLessons.length}
                id={rowsWithLessons.length}
                title=""
                description=""
                link=""
                removeLesson={this.removeLesson}
            />
        )
        this.setState({ hasAddedNewLesson: true, lessonListRows: '' })
    }

    displayConfirmationDialog = () => {
        this.setState({
            displayModal: true,
            modalTitle: 'Cancellation',
            modalMessage: 'Are you sure you want to leave this page?',
            isConfirmationModalType: true
        })
    }

    removeLesson = (listOfLessonsObjects) => {
        var newArray = []
        for (var i = 0; i < listOfLessonsObjects.length; i++) {
            var lesson = listOfLessonsObjects[i]

            newArray.push(
                <Lesson
                    key={i}
                    id={i}
                    removeLesson={this.removeLesson}
                    title={lesson.title}
                    description={lesson.description}
                    link={lesson.link}
                />
            )
        }
        rowsWithLessons = newArray
        this.setState({ hasAddedNewLesson: false, displayModal: false, lessonListRows: '' })
    }

    componentDidMount() {
        if (this.state.displayModal === false) {
            document.getElementById('modal-root').classList.add("modal")
            document.getElementById('modal-root').style.display = "none"
        }

        this.setState({ lessonListRows: '' })
        rowsWithLessons = []

        const { username } = this.props.match.params

        axios.get(clieserRestApiHostName + '/session?username=' + username)
            .then(response => {
                if (response.data['loggedin']) {
                    this.setState({ isLoggedIn: true })
                }
            })
    }

    componentDidUpdate() {
        if (this.state.displayModal === true) {
            document.getElementById('modal-root').style.display = "block"
            this.setState({ displayModal: false })
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
        else if (this.state.hasNewTutorialBeenCreated === false) {
            if (this.state.lessonListRows !== '')
                rowsWithLessons = this.state.lessonListRows
            console.log(this.state.lessonListRows)
            console.log(rowsWithLessons.length)
            return <NewTutorialForm
                rowsWithLessons={rowsWithLessons}
                title={this.state.title}
                handleAddLessonButtonListener={this.handleAddLessonButtonListener}
                displayConfirmationDialog={this.displayConfirmationDialog}
                handleAddTutorial={this.handleAddTutorial} />
        }
    }

    render() {
        if (!this.state.isLoggedIn) {
            const { username } = this.props.match.params

            axios.get(clieserRestApiHostName + '/session?username=' + username)
                .then(response => {
                    if (!response.data['loggedin']) {
                        this.props.history.push("/cms")
                    }
                })
        }

        return (
            <div>
                <div className="row">
                    <div className="col-sm-4"><Logo /></div>
                </div>
                <div className="container">
                    <h2 className="myh2">Tutorials</h2>
                    <div className="row">
                        <div className="col"><h4>New tutorial</h4><hr className="myhr" /></div>
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