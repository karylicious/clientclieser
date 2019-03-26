import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'
import Collapse from './collapse'
import axios from 'axios'
import Client from './client'

var rowsWithQuestions = []
class Exercises extends Component {
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
        answer: false
    }

    handleAnswerExerciseButtonListener = () => {
        this.setState({ answer: true })
    }

    diplayAnswerPanel() {
        if (this.state.answer) {
            return (
                <div className="effectShadow bottomspace padding20">
                    <Client />
                </div>
            )
        }
    }

    displayQuestions() {
        if (this.state.selectedExerciseID !== "") {
            var type, downloadFileHeadings
            if (this.state.selectedExerciseType == "client") {
                downloadFileHeadings = "Download a complete Web Service: "
            }
            else if (this.state.selectedExerciseType == "clientserver") {
                downloadFileHeadings = "Download a dummy Client and dummy Server: "
            }

            var fileName = this.state.selectedExerciseFile.split("/")

            //var rowsWithQuestions = []

            if (rowsWithQuestions.length == 0) {
                var listOfQuestions = this.state.questionList
                for (var i = 0; i < listOfQuestions.length; i++) {
                    var question = listOfQuestions[i]

                    rowsWithQuestions.push(
                        <div key={i}>
                            <p><strong>Question {(i + 1)} - {question.title}</strong></p>
                            <p>{question.description}</p>
                            <hr className="myhr" />
                        </div>
                    )
                }
            }

            return (
                <div className="col">
                    <div className="row">
                        <div className="col"><h4>{this.state.selectedExerciseName}</h4><hr className="myhr" /></div>
                    </div>

                    <div className="row bottomspace">
                        <div className="col">{downloadFileHeadings}<a>{fileName[1]}</a> </div>
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

    setExercise = (exercise) => {
        this.setState({
            questionList: exercise.questionList,
            selectedExerciseID: exercise.id,
            selectedExerciseFile: exercise.file,
            selectedExerciseName: exercise.name,
            selectedExerciseType: exercise.type,
            answer: false
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
                            <Collapse setExercise={this.setExercise} />
                        </div>
                        {this.displayQuestions()}
                    </div>
                </div>
                <div><Footer /></div>
            </div>
        );
    }
}
export default Exercises