import React, { Component } from 'react'
import axios from 'axios'

export default class FileUpload extends Component {
    state = {
        selectedFile: null,
        validFile: false,
        isFileUploaded: false,
        dir: null
    }

    handleFileSelection = event => {
        var file = event.target.files[0]

        if (typeof file !== "undefined") {

            if (this.state.dir !== null) {
                document.getElementById("uploadFeedback").innerHTML = ''
                this.deletePreviousDirectory()
            }

            document.getElementById("fileChooserLabel").innerHTML = file.name;
            this.setState({ selectedFile: file })
            this.validateFile(file)
        }
        else {
            //this means that the user after having chosen a file tried to choose a file again but
            // pressed cancel button
            if (this.state.dir !== null)
                this.deletePreviousDirectory()
            /*this.setState({
                isFileUploaded: false,
                selectedFile: null,
                dir: null,
                validFile: false
            })*/
            this.resetComponent()
        }
    }

    resetComponent = () => {
        document.getElementById("fileChooserTextField").value = null
        document.getElementById("fileChooserLabel").innerHTML = 'Choose file'
        document.getElementById("uploadvalidation").innerHTML = ''
        document.getElementById("uploadFeedback").innerHTML = ''
        document.getElementById("fileChooserTextField").classList.remove("is-invalid")

        if (this.state.isFileUploaded)
            this.deletePreviousDirectory()

        this.setState({
            selectedFile: null,
            dir: null,
            validFile: false
        })
    }

    deletePreviousDirectory() {
        this.setState({ isFileUploaded: false })
        axios.delete('http://localhost:5000/zipfile?dir=' + this.state.dir)
    }

    handleFileUpload = () => {
        if (this.state.isFileUploaded)
            return

        if (this.state.validFile) {
            //if (document.getElementById("uploadvalidation").innerHTML == "") {
            //    console.log("found it")
            //   return
            // }
            const formData = new FormData();
            formData.append('file', this.state.selectedFile, this.state.selectedFile.name)

            axios.post('http://localhost:5000/zipfile', formData)
                .then(response => {

                    if (response.data['succeed'] === true) {
                        this.setState({ dir: response.data['d'], isFileUploaded: true })


                        document.getElementById("fileChooserTextField").classList.remove("is-invalid")
                        document.getElementById("uploadvalidation").innerHTML = ''

                        var path = process.env.PUBLIC_URL + '/imgs/check.png'
                        document.getElementById("uploadFeedback").innerHTML = "<img src=" + path + " />"
                        //document.getElementById("uploadFeedback").innerHTML += "<input type='hidden' id='hid' value='" + response.data['d'] + "'>"

                        if (this.props.uploadedFile !== null)
                            this.props.uploadedFile(response.data['d'] + "/" + this.state.selectedFile.name, this.state.selectedFile.name)
                    }
                })
        }
        else {
            //this.setState({ isFileUploaded: false })
            //document.getElementById("fileChooserTextField").className += " is-invalid"
            document.getElementById("uploadFeedback").innerHTML = ''
            //this.props.uploadedFile("")
        }
    }

    validateFile(selectedFile) {
        var file = selectedFile.name
        var valid = false
        var reason

        if (file.includes(".zip")) {
            valid = true
            this.setState({ validFile: true })
            reason = 'Please upload this file'
        }
        else {
            reason = 'Invalid file'
            this.setState({ validFile: false })
        }
        if (valid)
            document.getElementById("fileChooserTextField").classList.remove("is-invalid")
        document.getElementById("uploadvalidation").innerHTML = reason

        //The following will prevent the user to upload again a file that was already uploaded before having the exercise updated
        //if (this.state.isFileUploaded === true)
        //  this.setState({ validFile: false })
    }

    //validationFeedback(valid, reason) {
    //   if (valid)
    //       document.getElementById("fileChooserTextField").classList.remove("is-invalid")
    // document.getElementById("uploadvalidation").innerHTML = reason
    // }

    componentDidUpdate() {
        //console.log(this.props)
        //if (this.props.reset === false)
        //    return
        if (this.props.reset === true) {
            this.resetComponent()
            this.props.setResetToFalse()
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className={this.props.colClass}>
                        <p id="fileUploadHeadings">{this.props.fileUploadHeadings}</p>
                        <div className="input-group">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="fileChooserTextField" onChange={this.handleFileSelection} />
                                <label className="custom-file-label" id="fileChooserLabel" >Choose file</label>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.handleFileUpload}>Upload</button>
                            </div>
                            <div id="uploadFeedback"></div>
                        </div>
                        <p id="uploadvalidation" className="redWarning"></p>
                    </div>
                </div>
            </div>
        )
    }
}