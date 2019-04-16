import React, { Component } from 'react'
import Logo from './logo'
import Footer from './footer'
import Lesson from './lesson'
import Collapse from './collapse-tutorials'
import axios from 'axios'
import Modal from './modal'
import ModalContent from './modalcontent'
import EditTutorialForm from './cms-edit-tutorial-form'

var rowsWithLessons = []
var clieserRestApiHostName = 'https://clieser-restapi.herokuapp.com'

export default class ListTutorials extends Component {
    state = {
        hasAddedNewLesson: false,
        validForm: false,
        uploadedFileName: "",
        lessonList: [],
        selectedTutorialID: "",
        selectedTutorialTitle: "",
        hasDeletedLesson: false,
        hasSelectedTutorial: false,
        tutorialList: [],
        displayModal: false,
        modalTitle: '',
        modalMessage: '',
        isConfirmationModalType: false,
        displayWaitImage: false,
        displayPasswordManagementPanel: false,
        displayWarningPasswordEmpty: false,
        isLoggedIn: false
    }

    handleUpdateTutorial = () => {
        if (this.isValidForm()) {

            var listOfLessonsObjects = this.getListOfLessonObjects()

            var data = {
                title: document.getElementById("title").value,
                id: this.state.selectedTutorialID,
                lessons: listOfLessonsObjects
            }

            var jsonData = JSON.stringify(data);

            this.setState({ displayWaitImage: true })

            axios.put(clieserRestApiHostName + '/tutorial', jsonData, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    window.scrollTo(0, 0)

                    var message
                    if (response.data["succeed"] === true)
                        message = "Tutorial has been updated successfully."

                    else if (response.data["succeed"] === false)
                        message = response.data["info"]

                    this.setState({
                        displayModal: true,
                        modalTitle: 'Notification',
                        modalMessage: message,
                        isConfirmationModalType: false,
                        displayWaitImage: false,
                        hasDeletedLesson: false
                    })

                    axios.get(clieserRestApiHostName + '/lesson?tutorialid=' + this.state.selectedTutorialID)
                        .then(response => {
                            this.setState({
                                lessonList: response.data
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
            modalTitle: 'Delete Tutorial',
            modalMessage: 'Are you sure you want to delete this tutorial?',
            isConfirmationModalType: true,
            displayWaitImage: false
        })
    }

    handleDeleteTutorial = () => {
        this.handleCloseModal()
        this.setState({ displayWaitImage: true })

        axios.delete(clieserRestApiHostName + '/tutorial?tutorialid=' + this.state.selectedTutorialID)
            .then(response => {

                this.setState({
                    hasAddedNewLesson: false,
                    validForm: false,
                    uploadedFileName: '',
                    lessonList: [],
                    selectedTutorialID: "",
                    selectedTutorialTitle: "",
                    hasDeletedLesson: false,
                    displayModal: true,
                    modalTitle: 'Notification',
                    modalMessage: "Tutorial has been deleted successfully.",
                    isConfirmationModalType: false,
                    displayWaitImage: false
                })

                var elements = document.getElementsByClassName("myCollapseActive")
                if (elements.length === 1)
                    elements[0].classList.remove("myCollapseActive")

                axios.get(clieserRestApiHostName + '/tutorial')
                    .then(response => {
                        this.setState({ tutorialList: response.data });
                    })
            })
    }

    isValidForm() {
        var valid = true
        var allElements = document.getElementsByClassName("form-control")

        // (allElements.length == 3) 3 means the title input field of the tutorial details and the two inputs of the change of password form
        if (allElements.length === 3) {
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
                selectedTutorialTitle: titleOfTutorial
            })
        }

        return valid
    }

    getListOfLessonObjects() {
        var listTitle = document.getElementsByClassName("lessontitle")
        var listDescr = document.getElementsByClassName("lessondescription")
        var listLink = document.getElementsByClassName("lessonlink")
        var listOfLessonObjects = []

        for (var i = 0; i < listTitle.length; i++) {
            listOfLessonObjects.push({
                title: listTitle[i].value,
                description: listDescr[i].value,
                link: listLink[i].value
            })
        }
        return listOfLessonObjects
    }

    renderPanelManagement = () => {
        const { username } = this.props.match.params
        this.props.history.push("/cms/management/" + username)
    }

    getTutorialByID = (id) => {
        axios.get(clieserRestApiHostName + '/tutorial?tutorialid=' + id)
            .then(response => {

                this.setState({
                    selectedTutorialID: id,
                    selectedTutorialTitle: response.data['title'],
                    hasSelectedTutorial: true,
                    hasDeletedTutorial: false,
                    hasDeletedLesson: false,
                    displayModal: false
                })

                axios.get(clieserRestApiHostName + '/lesson?tutorialid=' + id)
                    .then(response => {
                        this.setState({
                            lessonList: response.data
                        })
                    })
            })
    }

    componentDidUpdate() {
        if (this.state.hasSelectedTutorial === true) {
            document.getElementById("title").value = this.state.selectedTutorialTitle
            this.setState({ hasSelectedTutorial: false })
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
        else if (this.state.selectedTutorialID === "") {
            return (
                <div className="col">
                    <p>Here you can edit your tutorials!</p>
                    <div className="bottomRight">
                        <button className="mybtn" onClick={this.renderPanelManagement}>Return</button>
                    </div>
                </div>
            )
        }
        else if (this.state.selectedTutorialID !== "") {
            if (this.state.displayModal === true) {
                document.getElementById('modal-root').style.display = "block"
            }

            if (this.state.hasDeletedLesson === false) {

                rowsWithLessons = []
                var listOfLessonObjects = this.state.lessonList

                for (var i = 0; i < listOfLessonObjects.length; i++) {
                    var lesson = listOfLessonObjects[i]

                    rowsWithLessons.push(
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

            }

            return <EditTutorialForm
                rowsWithLessons={rowsWithLessons}
                selectedTutorialTitle={this.state.selectedTutorialTitle}
                handleAddLessonButtonListener={this.handleAddLessonButtonListener}
                displayConfirmationDialog={this.displayConfirmationDialog}
                handleUpdateTutorial={this.handleUpdateTutorial}
                handleDownloadFile={this.handleDownloadFile}
                renderPanelManagement={this.renderPanelManagement} />
        }
    }

    handleCloseModal() {
        document.getElementById('modal-root').style.display = "none"
    }

    handleNewTutorial = () => {
        if (this.state.displayWaitImage === false) {
            const { username } = this.props.match.params
            this.props.history.push("/cms/new-tutorial/" + username)
        }
    }

    handleAddLessonButtonListener = () => {
        document.getElementById("pLessonValidatorFeedback").innerHTML = ""
        rowsWithLessons.push(
            <Lesson key={rowsWithLessons.length}
                id={rowsWithLessons.length}
                title=""
                description=""
                link=""
                removeLesson={this.removeLesson}
            />
        )

        // The following line prevents the renderForm() function to reload the array rowsWithLessons with 
        // the lessons on the "this.state.lessonList" variable
        this.setState({ hasDeletedLesson: true, displayModal: false })
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

    removeLesson = (listOfLessonObjects) => {
        var newArray = []
        for (var i = 0; i < listOfLessonObjects.length; i++) {

            var lesson = listOfLessonObjects[i]
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
        this.setState({ hasDeletedLesson: true })
    }

    componentDidMount() {
        if (this.state.displayModal === false) {
            document.getElementById('modal-root').classList.add("modal")
            document.getElementById('modal-root').style.display = "none"
        }


        const { username } = this.props.match.params

        axios.get(clieserRestApiHostName + '/tutorial')
            .then(response => {
                this.setState({ tutorialList: response.data })

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
                    <div className="col-sm-4">
                        <Logo />
                    </div>
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
                    <h2 className="myh2">Tutorials</h2>
                    <div className="row alignRight">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleNewTutorial}>New Tutorial</button>
                    </div>
                    <div className="row marginLeft0">
                        <div className="col-sm-5 collapseColumn">
                            <Collapse getTutorialByID={this.getTutorialByID} tutorialList={this.state.tutorialList} />
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
                        handleConfirmation={this.handleDeleteTutorial} />
                } />
            </div>
        )
    }
} 