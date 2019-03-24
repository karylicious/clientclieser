import React, { Component } from 'react'

class Question extends Component {
    constructor(props) {
        super(props);
        this.getid = this.getid.bind(this);
    };

    state = {
        questionID: this.props.id,
        title: '',
        description: ''
    }

    getid() {
        alert();
        //return this.state.questionID
    }

    componentDidMount() {
        //    this.props.setID(this.setQuestionID);
        this.props.getID(this.getid);
    }
    //componentDidMount() {
    //    this.props.onRef(this)
    //}
    //componentWillUnmount() {
    //   this.props.onRef(null)
    //}

    setQuestionID = (newID) => {
        alert();
        this.setState({ questionID: newID })
    }

    setQuestionTitle = () => {
        var currentTitle = document.getElementById("title-" + this.state.questionID).innerHTML
        this.setState({ title: currentTitle })
    }

    setQuestionDescription = () => {
        var currentDescription = document.getElementById("description-" + this.state.questionID).innerHTML
        this.setState({ description: currentDescription })
    }

    handleRemoveQuestion = () => {
        this.props.removeQuestion(this.props.id - 1)
    }
    render() {
        return (
            <div className="effectShadow bottomspace padding20">
                <div className="row">
                    <div className="col">
                        <p><strong>Question {this.state.questionID}</strong></p>
                        <label>Title</label>
                        <input className="form-control myinputtext" type="text" name="clientEntryPoint" id={"title-" + this.state.questionID} />
                    </div>
                </div>
                <div className="row bottomspace">
                    <div className="col">
                        <label>Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" id={"description-" + this.state.questionID}></textarea>
                    </div>
                </div>
                <div className="row alignRight">
                    <button className="btn btn-outline-secondary" type="button" onClick={this.handleRemoveQuestion}>Remove</button>
                </div>
            </div>
        )
    }
}
export default Question