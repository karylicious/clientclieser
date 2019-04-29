import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'
import Collapse from './collapse-exercises'
import axios from 'axios'
import Modal from './modal'
import ModalContent from './modalcontent'
import FileUpload from './fileupload'
import Grading from './grading';

var clieserRestApiHostName = 'https://clieser-restapi.herokuapp.com'

export default class Exercises extends Component {

    state = {
        uploadedFileName: "",
        questionList: [],
        selectedExerciseID: "",
        selectedExerciseFile: "",
        selectedExerciseType: "",
        selectedExerciseExpectedClientEntryPoint: "",
        selectedExerciseDescription: "",
        dir: "",
        displayAnswerPanel: false,
        hasSelectedExercise: false,
        exerciseList: [],
        resetUploadFileComponent: false,
        displayModal: false,
        modalTitle: '',
        modalMessage: '',
        isConfirmationModalType: false,
        isNewAnswer: true
    }

    handleDownloadFile = () => {
        axios.get(clieserRestApiHostName + '/zipfile?file=' + this.state.selectedExerciseFile)
            .then(response => {
                if (response.data["succeed"] === false) {
                    this.setState({
                        displayModal: true,
                        modalTitle: 'Notification',
                        modalMessage: 'File not found.',
                        isConfirmationModalType: false
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

    handleNewAnswer = (state) => {
        this.setState({ isNewAnswer: true })
    }

    handleCloseModal = () => {
        document.getElementById('modal-root').style.display = "none"
        this.setState({ displayModal: false })
    }

    handleAnswerExerciseButtonListener = () => {
        this.setState({ displayAnswerPanel: true })
    }

    setPath = (path, fileName) => {
        this.setState({ dir: path, uploadedFileName: fileName })
    }

    setResetUploadFileComponent = () => {
        this.setState({ resetUploadFileComponent: false, displayModal: false })
    }

    handleVerifyAnswerButton = () => {
        if (this.isValidForm()) {
            this.setState({ isNewAnswer: false })
        }
    }

    diplayAnswerPanel() {
        if (this.state.displayAnswerPanel) {
            if (this.state.isNewAnswer) {

                var component, details

                if (this.state.selectedExerciseType === "client") {
                    component = "Client"
                    details =
                        <ul id="answer-rules">
                            <li>Your Client must be written in Java.</li>
                            <li>Your Client must be a NetBeans IDE project.</li>
                            <li>Your project must contain the build directory (usually found at the root directory) that is generated by the NetBeans IDE when it is compiled.</li>
                            <li>This test will expect that the Class with the main method and its package of the Client project is <strong>{this.state.selectedExerciseExpectedClientEntryPoint}</strong>.</li>
                            <li>You can upload multiple projects in one single .zip file, however each project inside the .zip file is expected to be also a .zip file.</li>
                            <li>When uploading multiple projects, this test will assume all projects have the <strong>{this.state.selectedExerciseExpectedClientEntryPoint}</strong> entry point.</li>
                            <li>The system takes about 10 seconds to validate a single project.</li>
                        </ul>
                }

                else if (this.state.selectedExerciseType === "clientserver") {
                    component = "Client Server"
                    details =
                        <ul id="answer-rules">
                            <li>This test will assume that both Client and Web Service components will try to communicate to each other.</li>
                            <li>Both Client and Server have to be separate projects.</li>
                            <li>Each project has to be a NetBeans IDE project.</li>
                            <li>Your Server component must be a SOAP web service.</li>
                            <li>Your Client and Web Service components must be written in Java.</li>
                            <li>Your Client project must contain the build directory (usually found at the root directory) that is generated by the NetBeans IDE when it is compiled.</li>
                            <li>The zip file being uploaded must contain the directory of the Client project and the directory of the Web service project. </li>
                            <li>This test will expect that the Class with the main method and its package of the Client project is <strong>{this.state.selectedExerciseExpectedClientEntryPoint}</strong>.</li>
                            <li>You can upload multiple projects in one single .zip file, however each project inside the .zip file is expected to be also a .zip file containing the directory of the Client project and the directory of the Web service project.</li>
                            <li>When uploading multiple projects, this test will assume all Client projects have the <strong>{this.state.selectedExerciseExpectedClientEntryPoint}</strong> entry point.</li>
                            <li>The system takes about 30 seconds to validate a single project.</li>
                        </ul>
                }

                return (
                    <div className="effectShadow bottomspace padding20">
                        <div className="container">
                            <div className="row">
                                <div className="col"><h4>Upload your {component} Project</h4><hr className="myhr" /></div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p>In order to successufully verify you answer: </p>
                                    {details}
                                </div>
                            </div>
                            <div className="row bottomspace">
                                <FileUpload
                                    uploadedFile={this.setPath}
                                    setResetToFalse={this.setResetUploadFileComponent}
                                    reset={this.state.resetUploadFileComponent}
                                    colClass={"col"} fileUploadHeadings="Upload your project as .zip file"
                                />
                            </div>
                            <div className="textright">
                                <button className="mybtn" onClick={this.handleVerifyAnswerButton}>Verify Answer</button>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="effectShadow bottomspace padding20 userGradePanel">
                        <Grading
                            selectedComponent={this.state.selectedExerciseType}
                            cliententrypoint={this.state.selectedExerciseExpectedClientEntryPoint}
                            uploadedFile={this.state.uploadedFileName}
                            dir={this.state.dir}
                            handleNewAnswer={this.handleNewAnswer}
                            selectedExerciseID={this.state.selectedExerciseID}
                        />
                    </div>
                )
            }
        }
    }

    componentDidUpdate() {
        if (this.state.displayModal === true) {
            document.getElementById('modal-root').style.display = "block"
            this.setState({ displayModal: false })
        }
    }

    componentDidMount() {
        if (this.state.displayModal === false) {
            document.getElementById('modal-root').classList.add("modal")
            document.getElementById('modal-root').style.display = "none"
        }
        axios.get(clieserRestApiHostName + '/exercise')
            .then(response => {
                this.setState({ exerciseList: response.data })
            })
    }

    renderQuestions() {
        if (this.state.selectedExerciseID === "") {
            return (
                <div className="col">
                    <p>Select an exercise to see more.</p>
                </div>
            )
        }

        else if (this.state.selectedExerciseID !== "") {
            var downloadFileHeadings

            if (this.state.selectedExerciseType === "client") {
                downloadFileHeadings = "Attached complete Web Service file: "
            }
            else if (this.state.selectedExerciseType === "clientserver") {
                downloadFileHeadings = "Attached dummy Client and dummy Server file: "
            }

            var fileName = this.state.selectedExerciseFile.split("/")
            var elements = document.getElementsByClassName("myCollapseActive")
            var selectedExerciseName = elements[0].innerHTML

            var rowsWithQuestions = []
            var listOfQuestions = this.state.questionList

            for (var i = 0; i < listOfQuestions.length; i++) {
                var question = listOfQuestions[i]

                rowsWithQuestions.push(
                    <div key={i}>
                        <p><strong>Question {(i + 1)} - {question.title}  ({question.points} points)</strong></p>
                        <p>{question.description}</p>
                        <hr className="myhr" />
                    </div>
                )
            }

            return (
                <div className="col">
                    <div className="row">
                        <div className="col"><h4>{selectedExerciseName}</h4><hr className="myhr" /></div>
                    </div>
                    <div className="row bottomspace">
                        <div className="col">{this.state.selectedExerciseDescription}</div>
                    </div>
                    <div className="row bottomspace">
                        <div className="col"><strong>Expected Client entry point: </strong>{this.state.selectedExerciseExpectedClientEntryPoint}</div>
                    </div>
                    <div className="row bottomspace">
                        <div className="col"><strong>{downloadFileHeadings} </strong> <span>{fileName[1]}</span>   <button className="btn btn-outline-secondary" type="button" onClick={this.handleDownloadFile}>Download</button> </div>
                    </div>
                    <div className="container">
                        {rowsWithQuestions}
                    </div>
                    <div className="row paddingLeft15 bottomspace">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleAnswerExerciseButtonListener}>Answer</button>
                    </div>
                    <div className="row">
                        {this.diplayAnswerPanel()}
                    </div>
                </div>
            )
        }
    }

    isValidForm() {
        var valid = true
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
        return valid
    }

    getExerciseByID = (id) => {
        this.setState({ displayAnswerPanel: false })

        if (this.state.dir !== "")
            this.setState({ resetUploadFileComponent: true, dir: "", uploadedFileName: "" })

        axios.get(clieserRestApiHostName + '/exercise?exerciseid=' + id)
            .then(response => {

                this.setState({
                    selectedExerciseID: id,
                    selectedExerciseFile: response.data['uploadedfile'],
                    selectedExerciseType: response.data['exercisetype'],
                    selectedExerciseExpectedClientEntryPoint: response.data['expectedcliententrypoint'],
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

    render() {
        return (
            <div>
                <TopContainer standardOpening={false} />
                <h2 className="myh2">Test your knowledge</h2>
                <div className="container collapseContainer">
                    <div className="row marginLeft0">
                        <div className="col-sm-5 collapseColumn">
                            <Collapse getExerciseByID={this.getExerciseByID} exerciseList={this.state.exerciseList} />
                        </div>
                        {this.renderQuestions()}
                    </div>
                </div>
                <Footer />
                <Modal children={
                    <ModalContent
                        title={this.state.modalTitle}
                        message={this.state.modalMessage}
                        isConfirmationModalType={false}
                        handleCloseModal={this.handleCloseModal}
                    />
                } />
            </div>
        )
    }
}