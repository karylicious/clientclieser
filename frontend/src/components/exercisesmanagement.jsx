import React, { Component } from 'react'
import Logo from './logo'
import FileUpload from './fileupload'
import Footer from './footer'
import Question from './exercisequestion'

const rowsWithQuestions = []
class ExercisesManagement extends Component {
    constructor(props) {
        super(props);
    };
    state = {
        hasAddedNewQuestion: false
    }


    clientRadioButtonListener = () => {
        this.setState({ selectedComponent: 'client' })
    }

    clientserverRadioButtonListener = () => {
        this.setState({ selectedComponent: 'both' })
    }

    renderFileUpload() {
        if (this.state.selectedComponent === "client") {
            return (
                <div className="row">
                    <FileUpload fileUploadHeadings='Upload a complete Web Service as .zip file'></FileUpload>
                </div>
            )
        }
        else if (this.state.selectedComponent === "both") {
            return (
                <div className="row">
                    <FileUpload fileUploadHeadings='Upload a dummy Client and a dummy Server as .zip file'></FileUpload>
                </div>
            )
        }
    }

    handleAddQuestionButtonListener = () => {
        rowsWithQuestions.push(<Question key={rowsWithQuestions.length}
            id={rowsWithQuestions.length + 1}
            removeQuestion={this.removeQuestion}
            //onRef={ref => (this.child = ref)} />)
            getID={instance => this.child = instance} />)
        //setID={instance => { this.child = instance; }} />)
        this.setState({ hasAddedNewQuestion: true })
    }


    removeQuestion = (index) => {
        rowsWithQuestions.splice(index, 1)

        for (var i = 0; i < rowsWithQuestions.length; i++) {
            //this.child.setQuestionID(i)
            //this.child.getid;
            //console.log(rowsWithQuestions[i].props.setQuestionID(i))
            //rowsWithQuestions[i].props.setID(i)
            //console.log(rowsWithQuestions[i].props.getID())
            //console.log(this.props.children)
            //console.log(this.child.current.getid())
            console.log(rowsWithQuestions[i].getID)
        }
        // console.log(rowsWithQuestions[index - 1].props);


        this.setState({ hasAddedNewQuestion: false })
    }

    render() {
        console.log(rowsWithQuestions)
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4">
                        <Logo></Logo>
                    </div>
                </div>
                <div className="container">
                    <h2 className="myh2">Exercises</h2>
                    <div className="row">
                        <div className="col-lg-6 marginLeft15"><h4>New exercise</h4><hr className="myhr" /></div>
                    </div>
                    <div className="row marginLeft15">
                        <div className="col-sm-7">
                            <p>Select the type of components exercise</p>
                            <div className="divRadio">
                                <label className="labelRadio">
                                    <input type="radio" className="form-check-input" name="optradio" onClick={this.clientRadioButtonListener} />Client component
                                </label>
                                <label>
                                    <input type="radio" className="form-check-input" name="optradio" onClick={this.clientserverRadioButtonListener} />Both Client and Server components
                                </label>
                            </div>
                        </div>
                    </div>
                    {this.renderFileUpload()}
                    <div className="row bottomspace">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleAddQuestionButtonListener}>Add Question</button>
                    </div>
                    <div className="container">
                        {rowsWithQuestions}
                    </div>
                </div>
            </div>
        );
    }
}
export default ExercisesManagement