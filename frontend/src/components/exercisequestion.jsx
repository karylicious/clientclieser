import React, { Component } from 'react'

export default class Question extends Component {

    handleRemoveQuestion = (e) => {
        var questionID = e.target.id
        questionID = questionID.split("-")

        var listOfQuestionObjects = this.getCurrentSiblingsContent(questionID[1])
        this.props.removeQuestion(listOfQuestionObjects)
    }

    getCurrentSiblingsContent(questionToBeRemovedID) {
        var listTitle = document.getElementsByClassName("questiontitle")
        var listDescr = document.getElementsByClassName("questiondescription")
        var listExpectedOuput = document.getElementsByClassName("questionexpectedoutput")
        var listPoints = document.getElementsByClassName("questionpoints")
        var listExpectedInvokedMethod = document.getElementsByClassName("questionexpectedinvokedmethod")
        var listOfQuestionObjects = []

        for (var i = 0; i < listTitle.length; i++) {
            if (listTitle[i].id !== "title-" + questionToBeRemovedID) {
                listOfQuestionObjects.push({
                    title: listTitle[i].value,
                    description: listDescr[i].value,
                    expectedoutput: listExpectedOuput[i].value,
                    points: listPoints[i].value,
                    expectedinvokedmethod: listExpectedInvokedMethod[i].value
                })
            }
        }
        return listOfQuestionObjects
    }

    componentDidUpdate() {
        document.getElementById("title-" + this.props.id).value = this.props.title
        document.getElementById("descr-" + this.props.id).value = this.props.description
        document.getElementById("expectedoutput-" + this.props.id).value = this.props.expectedoutput
        document.getElementById("points-" + this.props.id).value = this.props.points
        document.getElementById("expectedinvokedmethod-" + this.props.id).value = this.props.expectedinvokedmethod
    }

    render() {
        return (
            <div className="effectShadow bottomspace padding20">
                <div className="row">
                    <div className="col">
                        <p><strong>Question {this.props.id + 1}</strong></p>
                        <label>Title</label>
                        <input className="form-control myinputtext questiontitle question" id={"title-" + this.props.id} type="text" defaultValue={this.props.title} />
                    </div>
                </div>
                <div className="row bottomspace">
                    <div className="col">
                        <label>Description</label>
                        <textarea className="form-control questiondescription question" id={"descr-" + this.props.id} rows="6" defaultValue={this.props.description}></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Expected Invoked Method <span className="systemwarning"> (without parentesis)</span></label>
                        <input className="form-control myinputtext questionexpectedinvokedmethod question" id={"expectedinvokedmethod-" + this.props.id} type="text" defaultValue={this.props.expectedinvokedmethod} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Expected Output</label>
                        <input className="form-control myinputtext questionexpectedoutput question" id={"expectedoutput-" + this.props.id} type="text" defaultValue={this.props.expectedoutput} />
                    </div>
                </div>
                <div className="row bottomspace">
                    <div className="col-sm-2">
                        <label>Points</label>
                        <input className="form-control myinputtext questionpoints question" id={"points-" + this.props.id} type="number" defaultValue={this.props.points} />
                    </div>
                </div>
                <div className="row alignRight">
                    <button className="btn btn-outline-secondary" id={"removeQuestion-" + this.props.id} type="button" onClick={this.handleRemoveQuestion}>Remove</button>
                </div>
            </div>
        )
    }
} 