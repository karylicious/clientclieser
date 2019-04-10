import React, { Component } from 'react'

export default class EditTutorialForm extends Component {

    render() {
        return (
            <div className="col">
                <div className="row">
                    <div className="col"><h4>Edit tutorial</h4><hr className="myhr" /></div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Title</label>
                        <input className="form-control myinputtext" id="title" type="text" defaultValue={this.props.selectedTutorialTitle} />
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
                    <button className="mybtn" onClick={this.props.renderPanelManagement}>Return</button> <button className="mybtn" onClick={this.props.displayConfirmationDialog}>Delete Tutorial</button> <button className="mybtn" onClick={this.props.handleUpdateTutorial}>Save Tutorial</button>
                </div>
            </div>
        )
    }
}