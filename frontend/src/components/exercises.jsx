import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'
import Collapse from './collapse-exercises'
import axios from 'axios'
import Modal from './modal'
import ModalContent from './modalcontent'
import FileUpload from './fileupload'
import Grading from './grading';

//var rowsWithQuestions = []
export default class Exercises extends Component {
    state = {
        //hasAddedNewQuestion: false,
        //validForm: false,
        uploadedFileName: "",
        questionList: [],
        selectedExerciseID: "",
        selectedExerciseFile: "",
        //selectedExerciseName: "",
        selectedExerciseType: "",
        selectedExerciseExpectedClientEntryPoint: "",
        selectedExerciseDescription: "",
        dir: "",
        displayAnswerPanel: false,
        //hasDeletedQuestion: false,
        hasSelectedExercise: false,
        exerciseList: [],
        resetUploadFileComponent: false,
        //modalChild: '',
        displayModal: false,
        modalTitle: '',
        modalMessage: '',
        isConfirmationModalType: false,
        isNewAnswer: true
        //uploadedFile: '', look this
        //displayWaitImage: false
    }

    handleDownloadFile = () => {
        axios.get('http://localhost:5000/zipfile?file=' + this.state.selectedExerciseFile)
            .then(response => {
                //alert(response.data)
                if (response.data["succeed"] === false) {
                    this.setState({
                        displayModal: true,
                        modalTitle: 'Notification',
                        modalMessage: 'File not found.',
                        isConfirmationModalType: false
                    })
                }
                else {
                    var MIME_TYPE = "application/x-zip-compressed";

                    var blob = new Blob([response.data], { type: MIME_TYPE })

                    var link = document.createElement('a');
                    // convert bite array into blob
                    link.href = window.URL.createObjectURL(blob);
                    // set a human file name
                    var fileName = this.state.selectedExerciseFile.split("/")
                    link.download = fileName[1];
                    // triggers automatic download
                    link.click()
                }
            })
    }

    handleNewAnswer = (state) => {
        this.setState({ isNewAnswer: true })
    }

    handleCloseModal() {
        document.getElementById('modal-root').style.display = "none"
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
                            <li>Your Client must be written in Java</li>
                            <li>Your Client must be a NetBeans project</li>
                            <li>This test will expect that the Class with the main method and its package of the Client project is <strong>{this.state.selectedExerciseExpectedClientEntryPoint}</strong></li>
                            <li>You can upload multiple projects in one single .zip file, however each project inside the .zip file is expected to be also a .zip file</li>
                            <li>When uploading multiple projects, this test will assume all projects have the <strong>{this.state.selectedExerciseExpectedClientEntryPoint}</strong> entry point</li>
                        </ul>
                }

                else if (this.state.selectedExerciseType === "clientserver") {
                    component = "Client Server"
                    details =
                        <ul id="answer-rules">
                            <li>This test will assume that both Client and Web Service components will try to communicate to each other</li>
                            <li>Your Client and Web Service components must be written in Java</li>
                            <li>The zip file being uploaded must contain the .zip file of the Client project and the .zip file of the Web service project </li>
                            <li>Your Client and Web Service components must be separate NetBeans projects</li>
                            <li>This test will expect that the Class with the main method and its package of the Client project is <strong>{this.state.selectedExerciseExpectedClientEntryPoint}</strong></li>
                            <li>You can upload multiple projects in one single .zip file, however each project inside the .zip file is expected to be also a .zip file containing the zip file of the Client project and the zip file of the Web service project</li>
                            <li>When uploading multiple projects, this test will assume all Client projects have the <strong>{this.state.selectedExerciseExpectedClientEntryPoint}</strong> entry point</li>
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
                                <FileUpload uploadedFile={this.setPath} setResetToFalse={this.setResetUploadFileComponent} reset={this.state.resetUploadFileComponent} colClass={"col"} fileUploadHeadings="Upload your project as .zip file"></FileUpload>
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
                    <div className="effectShadow bottomspace padding20">
                        <Grading selectedComponent={this.state.selectedExerciseType}
                            clientEntryPoint={this.state.selectedExerciseExpectedClientEntryPoint}
                            uploadedFile={this.state.uploadedFileName}
                            dir={this.state.dir}
                            handleNewAnswer={this.handleNewAnswer} />
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
        axios.get('http://localhost:5000/exercise')
            .then(response => {
                this.setState({ exerciseList: response.data })
            })
    }

    renderQuestions() {
        if (this.state.selectedExerciseID !== "") {
            var downloadFileHeadings
            if (this.state.selectedExerciseType == "client") {
                downloadFileHeadings = "Attached complete Web Service file: "
            }
            else if (this.state.selectedExerciseType == "clientserver") {
                downloadFileHeadings = "Attached dummy Client and dummy Server file: "
            }

            var fileName = this.state.selectedExerciseFile.split("/")
            var elements = document.getElementsByClassName("myCollapseActive")
            var selectedExerciseName = elements[0].innerHTML

            var rowsWithQuestions = []

            //if (rowsWithQuestions.length == 0) {
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
            //}

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

        axios.get('http://localhost:5000/exercise?exerciseid=' + id)
            .then(response => {

                this.setState({
                    selectedExerciseID: id,
                    selectedExerciseFile: response.data['uploadedfile'],
                    //selectedExerciseName: response.data['name'],
                    selectedExerciseType: response.data['exerciseType'],
                    selectedExerciseExpectedClientEntryPoint: response.data['expectedClientEntryPoint'],
                    selectedExerciseDescription: response.data['description'],
                    hasSelectedExercise: true,
                    hasDeletedExercise: false,
                    hasDeletedQuestion: false,
                    resetUploadFileComponent: false,
                    displayModal: false
                })

                axios.get('http://localhost:5000/exercisequestion?exerciseid=' + id)
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
                <div><TopContainer standardOpening={false} /></div>
                <h2 className="myh2">Test your knowledge</h2>
                <div className="container collapseContainer">
                    <div className="row marginLeft0">
                        <div className="col-sm-5 collapseColumn">
                            <Collapse getExerciseByID={this.getExerciseByID} exerciseList={this.state.exerciseList} />
                        </div>
                        {this.renderQuestions()}
                    </div>
                </div>
                <div><Footer /></div>
                <Modal children={<ModalContent
                    title={this.state.modalTitle}
                    message={this.state.modalMessage}
                    isConfirmationModalType={false}
                    handleCloseModal={this.handleCloseModal} />}>
                </Modal>
            </div>
        );
    }
}
