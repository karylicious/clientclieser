import React, { Component } from 'react'

class Question extends Component {
    handleRemoveQuestion = (e) => {
        var questionID = e.target.id
        questionID = questionID.split("-")
        var listOfQuestions = this.getCurrentSiblingsContent(questionID[1])
        this.props.removeQuestion(listOfQuestions)
    }

    getCurrentSiblingsContent(questionToBeRemovedID) {
        var listTitle = document.getElementsByClassName("questiontitle");
        var listDescr = document.getElementsByClassName("questiondescription");
        var listOfQuestions = []

        for (var i = 0; i < listTitle.length; i++) {
            if (listTitle[i].id !== "title-" + questionToBeRemovedID) {
                listOfQuestions.push({ title: listTitle[i].value, description: listDescr[i].value })
            }
        }
        return listOfQuestions
    }

    componentDidMount() {
        document.getElementById("title-" + this.props.id).value = this.props.title
        document.getElementById("descr-" + this.props.id).value = this.props.description
    }

    componentDidUpdate() {
        document.getElementById("title-" + this.props.id).value = this.props.title
        document.getElementById("descr-" + this.props.id).value = this.props.description
    }

    render() {
        return (
            <div className="effectShadow bottomspace padding20">
                <div className="row">
                    <div className="col">
                        <p><strong>Question {this.props.id + 1}</strong></p>
                        <label>Title</label>
                        <input className="form-control myinputtext questiontitle" id={"title-" + this.props.id} type="text" />
                    </div>
                </div>
                <div className="row bottomspace">
                    <div className="col">
                        <label>Description</label>
                        <textarea className="form-control questiondescription" id={"descr-" + this.props.id} rows="3" ></textarea>
                    </div>
                </div>
                <div className="row alignRight">
                    <button className="btn btn-outline-secondary" id={"removeQuestion-" + this.props.id} type="button" onClick={this.handleRemoveQuestion}>Remove</button>
                </div>
            </div>
        )
    }
}
export default Question