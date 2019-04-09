import React, { Component } from 'react'
import FileUpload from './fileupload'

export default class EditExerciseForm extends Component {


    setResetUploadFileComponent = () => {
        this.props.setResetUploadFileComponent()
    }

    renderFileUpload = () => {
        var headings
        if (this.props.selectedExerciseType === "client")
            headings = 'Upload a Web Service as .zip file'
        else if (this.props.selectedExerciseType === "clientserver")
            headings = 'Upload a dummy Client and a dummy Server as .zip file'

        if (this.props.selectedExerciseType === "client" || this.props.selectedExerciseType === "clientserver")
            return (
                <div className="row bottomspace marginLeft-15">
                    <FileUpload uploadedFile={this.props.setPath} setResetToFalse={this.setResetUploadFileComponent} reset={this.props.resetUploadFileComponent} colClass={"col"} fileUploadHeadings={headings}></FileUpload>
                </div>
            )

        /*if (this.props.selectedExerciseType === "client") {
            return (
                <div className="row bottomspace marginLeft-15">
                    <FileUpload uploadedFile={this.props.setPath} setResetToFalse={this.setResetUploadFileComponent} reset={this.props.resetUploadFileComponent} colClass={"col"} fileUploadHeadings='Upload new Web Service as .zip file'></FileUpload>
                </div>
            )
        }
        else if (this.props.selectedExerciseType === "clientserver") {
            return (
                <div className="row bottomspace marginLeft-15">
                    <FileUpload uploadedFile={this.props.setPath} setResetToFalse={this.props.setResetUploadFileComponent} reset={this.props.resetUploadFileComponent} colClass={"col"} fileUploadHeadings='Upload new dummy Client and a dummy Server as .zip file'></FileUpload>
                </div>
            )
        }*/
    }

    render() {
        return (
            <div className="col">
                <div className="row">
                    <div className="col"><h4>Edit exercise</h4><hr className="myhr" /></div>
                </div>
                <div className="row bottomspace">
                    <div className="col">Type of components exercise: <strong>{this.props.type}</strong></div>
                </div>

                <div className="row bottomspace">
                    <div className="col">
                        Attached file: <strong><span id="attachedFileName">{this.props.fileName}</span></strong>   <button className="btn btn-outline-secondary" type="button" onClick={this.props.handleDownloadFile}>Download</button>
                    </div>
                </div>

                {this.renderFileUpload()}
                <div className="row">
                    <div className="col">
                        <label>Expected name of the class with the main method and its package of a Client <span className="systemwarning"> (E.g com.example.MyMainClass)</span></label>
                        <input className="form-control myinputtext" id="expectedClientEntryPoint" type="text" defaultValue={this.props.selectedExerciseExpectedClientEntryPoint} />
                    </div>
                </div>
                <div className="row bottomspace">
                    <div className="col">
                        <label>Description</label>
                        <textarea className="form-control" id="description" rows="3" defaultValue={this.props.selectedExerciseDescription}></textarea>
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
                    <button className="mybtn" onClick={this.props.renderPanelManagement}>Return</button> <button className="mybtn" onClick={this.props.displayConfirmationDialog}>Delete Exercise</button> <button className="mybtn" onClick={this.props.handleUpdateExercise}>Save Exercise</button>
                </div>
            </div>
        )
    }
}