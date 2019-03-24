import React, { Component } from 'react'
import axios from 'axios'

class FileUpload extends Component {
    state = {
        selectedFile: null,
        validFile: false,
        isFileUploaded: false,
        dir: null
    }

    selectFile = event => {
        var file = event.target.files[0]
        var label = document.getElementsByClassName("custom-file-label")

        if (typeof file !== "undefined") {

            if (this.state.dir !== null) {
                document.getElementById("uploadFeedback").innerHTML = ''
                this.deletePrevDir()
            }

            label[0].innerHTML = file.name;
            this.setState({ selectedFile: file })
            this.validateFile(file)
        }
        else {
            //this means that the user after having chosen a file tried to choose a file again but
            // pressed cancel button
            this.deletePrevDir()
            this.setState({ isFileUploaded: false })
            this.setState({ selectedFile: null })
            this.setState({ dir: null })

            label[0].innerHTML = 'Choose file'
            document.getElementById("uploadvalidation").innerHTML = ''
            document.getElementById("uploadFeedback").innerHTML = ''

        }
    }

    deletePrevDir() {
        axios.delete('http://localhost:5000/deletedir?dir=' + this.state.dir)
            .then(response => {
                //console.log(response)
            })
    }

    uploadFile = () => {

        if (this.state.validFile) {
            const formData = new FormData();
            formData.append('file', this.state.selectedFile, this.state.selectedFile.name)

            axios.post('http://localhost:5000/uploadfile', formData)
                .then(response => {

                    if (response.data['succeed'] === 'true') {
                        this.setState({ isFileUploaded: true })
                        this.setState({ dir: response.data['d'] })

                        document.getElementById("inputGroupFile").classList.remove("is-invalid")
                        document.getElementById("uploadvalidation").innerHTML = ''

                        var path = process.env.PUBLIC_URL + '/imgs/check.png'
                        document.getElementById("uploadFeedback").innerHTML = "<img src=" + path + " />"
                        document.getElementById("uploadFeedback").innerHTML += "<input type='hidden' id='hid' value='" + response.data['d'] + "'>"

                    }
                })
        }
        else {
            this.setState({ isFileUploaded: false })
            document.getElementById("inputGroupFile").className += " is-invalid"
            document.getElementById("uploadFeedback").innerHTML = ''
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
        this.validationFeedback(valid, reason)
    }

    validationFeedback(valid, reason) {
        if (valid)
            document.getElementById("inputGroupFile").classList.remove("is-invalid")
        document.getElementById("uploadvalidation").innerHTML = reason
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-7">
                        <p id="fileUploadHeadings">{this.props.fileUploadHeadings}</p>
                        <div className="input-group">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="inputGroupFile" onChange={this.selectFile} />
                                <label className="custom-file-label" >Choose file</label>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.uploadFile}>Upload</button>
                            </div>
                            <div id="uploadFeedback"></div>
                        </div>
                        <p id="uploadvalidation" className="notuploaded"></p>
                    </div>
                </div>
            </div>
        )
    }
}
export default FileUpload