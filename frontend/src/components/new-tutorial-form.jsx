import React, { Component } from 'react'

export default class NewTutorialForm extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <label>Title</label>
                        <input className="form-control myinputtext" id="title" type="text" defaultValue={this.props.title} />
                    </div>
                </div>
                <div className="row paddingLeft15">
                    <button className="btn btn-outline-secondary" type="button" onClick={this.props.handleAddLessonButtonListener}>Add Lesson</button>
                </div>
                <p id="pLessonValidatorFeedback" className="paddingLeft15 bottomspace redWarning"></p>
                <div className="container">
                    {this.props.rowsWithLessons}
                </div>
                <div className="textright bottomspace">
                    <button className="mybtn" onClick={this.props.displayConfirmationDialog}>Cancel</button> <button className="mybtn" onClick={this.props.handleAddTutorial}>Create Tutorial</button>
                </div>
            </div>
        )
    }
}