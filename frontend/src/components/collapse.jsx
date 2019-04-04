import React, { Component } from 'react'
import CollapseItem from './collapseitem'
import axios from 'axios'


class Collapse extends Component {

    state = {
        hasRetrievedData: false,
        exerciseList: "",
        questionList: "",
        selectedExerciseID: "",
        selectedExerciseFile: "",
        selectedExerciseName: "",
        selectedExerciseType: ""
    }
    toggleCollapse = (e) => {
        var targetID = e.target.dataset.target
        document.getElementById(targetID).classList.toggle("show");

        if (targetID === "collapseOne")
            document.getElementById("collapseTwo").classList.remove("show")
        else if (targetID === "collapseTwo")
            document.getElementById("collapseOne").classList.remove("show")
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercise')
            .then(response => {
                this.setState({ exerciseList: response.data })
            })
    }


    getQuestions = (exerciseID, uploadedfile, exerciseName, exerciseType) => {
        //if (this.state.selectedExerciseID != "") {
        axios.get('http://localhost:5000/exercisequestion?exerciseid=' + exerciseID)
            .then(response => {
                this.setState({
                    questionList: response.data,
                    selectedExerciseID: exerciseID,
                    selectedExerciseFile: uploadedfile,
                    selectedExerciseName: exerciseName,
                    selectedExerciseType: exerciseType
                })
                this.props.setExercise({ id: exerciseID, name: exerciseName, file: uploadedfile, type: exerciseType, questionList: response.data })
            })
        // }
        //this.setState({ selectedExerciseID: id })
    }

    render() {
        var rowsWithItemsClient = []
        var rowsWithItemsClientServer = []
        var listOfObjs = this.state.exerciseList

        for (var i = 0; i < listOfObjs.length; i++) {
            var exercise = listOfObjs[i]
            if (exercise.exercisetype === "client") {
                rowsWithItemsClient.push(<CollapseItem key={rowsWithItemsClient.length}
                    id={exercise.id}
                    name={"Exercise " + (i + 1)}
                    file={exercise.uploadedfile}
                    type={exercise.exercisetype}
                    getQuestions={this.getQuestions} />)
            }
            else if (exercise.exercisetype === "clientserver") {
                rowsWithItemsClientServer.push(<CollapseItem key={rowsWithItemsClientServer.length}
                    id={exercise.id}
                    name={"Exercise " + (i + 1)}
                    file={exercise.uploadedfile}
                    type={exercise.exercisetype}
                    getQuestions={this.getQuestions} />)
            }
        }

        if (rowsWithItemsClientServer.length == 0)
            rowsWithItemsClientServer.push(<div key={0} className="noExercises">There is no exercise</div>)
        if (rowsWithItemsClient.length == 0)
            rowsWithItemsClient.push(<div key={0} className="noExercises">There is no exercise</div>)


        return (
            <div id="accordion">
                <div className="collapseHeader">
                    List of Exercises
                </div>
                <div className="card">
                    <div className="card-header cardheader" id="headingOne">
                        <h5 className="mb-0">
                            <p className="pCard" data-toggle="collapse" data-target="collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={this.toggleCollapse}>
                                Client Component
                            </p>
                        </h5>
                    </div>

                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body cardbody">
                            {rowsWithItemsClient}
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header cardheader" id="headingTwo">
                        <h5 className="mb-0">
                            <p className="pCard" data-toggle="collapse" data-target="collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={this.toggleCollapse}>
                                Both Client and Server Components
                            </p>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body cardbody">
                            {rowsWithItemsClientServer}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Collapse