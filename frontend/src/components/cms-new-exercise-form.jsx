import React, { Component } from 'react'
import FileUpload from './fileupload'

export default class NewExerciseForm extends Component {
    renderFileUpload = () => {
        var headings
        if (this.props.selectedComponent === "client")
            headings = 'Upload a complete working Web Service as .zip file'
        else if (this.props.selectedComponent === "both")
            headings = 'Upload a dummy Client and a dummy Server as .zip file'

        if (this.props.selectedComponent === "client" || this.props.selectedComponent === "both")
            return (
                <div className="row bottomspace marginLeft-15">
                    <FileUpload
                        uploadedFile={this.props.setPath}
                        colClass={"col-sm-7"}
                        fileUploadHeadings={headings}
                    />
                </div>
            )
    }
    render() {
        return (
            <div>
                <div className="row bottomspace">
                    <div className="col">
                        <p id="radioHeadings">Select the type of components exercise</p>
                        <div className="divRadio">
                            <label className="labelRadio">
                                <input type="radio" className="form-check-input" name="optradio" id="radioClient" onClick={this.props.clientRadioButtonListener} />Client component
                        </label>
                            <label>
                                <input type="radio" className="form-check-input" name="optradio" id="radioClientServer" onClick={this.props.clientserverRadioButtonListener} />Both Client and Server components
                        </label>
                        </div>
                    </div>
                </div>
                {this.renderFileUpload()}
                <div className="row">
                    <div className="col">
                        <label>Expected name of the class with the main method and its package of a Client <span className="systemwarning"> (E.g com.example.MyMainClass)</span></label>
                        <input className="form-control myinputtext" id="expectedClientEntryPoint" type="text" defaultValue={this.props.expectedClientEntryPoint} />
                    </div>
                </div>
                <div className="row bottomspace">
                    <div className="col">
                        <label>Description</label>
                        <textarea className="form-control" id="description" rows="3" defaultValue={this.props.description} ></textarea>
                    </div>
                </div>
                <div className="row paddingLeft15">
                    <button className="btn btn-outline-secondary" type="button" onClick={this.props.handleAddQuestionButtonListener}>Add Question</button>
                </div>
                <p id="pQuestionValidatorFeedback" className="paddingLeft15 bottomspace redWarning"></p>
                <div className="container">
                    {this.props.rowsWithQuestions}
                </div>
                <div className="textright bottomspace">
                    <button className="mybtn" onClick={this.props.displayConfirmationDialog}>Cancel</button> <button className="mybtn" onClick={this.props.handleAddExercise}>Create Exercise</button>
                </div>
            </div>
        )
    }
}