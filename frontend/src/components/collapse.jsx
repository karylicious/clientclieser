import React, { Component } from 'react'
import CollapseItem from './collapseitem'

export default class Collapse extends Component {

    /*state = {
        hasRetrievedData: false,
        questionList: "",
        selectedExerciseID: "",
        selectedExerciseFile: "",
        selectedExerciseName: "",
        selectedExerciseType: "",
        selectedExerciseExpectedClientEntryPoint: "",
        selectedExerciseDescription: "",
    }*/
    toggleCollapse = (e) => {
        var targetID = e.target.dataset.target
        document.getElementById(targetID).classList.toggle("show");

        if (targetID === "collapseOne")
            document.getElementById("collapseTwo").classList.remove("show")
        else if (targetID === "collapseTwo")
            document.getElementById("collapseOne").classList.remove("show")
    }







    getExerciseByID = (id) => {//, uploadedfile, exerciseName, exerciseType, exerciseExpectedClientEntryPoint, exerciseDescription) => {
        this.props.getExerciseByID(id)

        //if (this.state.selectedExerciseID != "") {
        /*axios.get('http://localhost:5000/exercisequestion?exerciseid=' + exerciseID)
            .then(response => {
                this.setState({
                    questionList: response.data,
                    selectedExerciseID: exerciseID,
                    selectedExerciseFile: uploadedfile,
                    selectedExerciseName: exerciseName,
                    selectedExerciseType: exerciseType,
                    selectedExerciseExpectedClientEntryPoint: exerciseExpectedClientEntryPoint,
                    selectedExerciseDescription: exerciseDescription
                })
                this.props.getExerciseByID({
                    id: exerciseID,
                    name: exerciseName,
                    file: uploadedfile,
                    type: exerciseType,
                    expectedClientEntryPoint: exerciseExpectedClientEntryPoint,
                    description: exerciseDescription,
                    questionList: response.data
                })
            })*/
        // }
        //this.setState({ selectedExerciseID: id })
    }

    render() {
        var rowsWithItemsClient = []
        var rowsWithItemsClientServer = []
        var listOfObjs = this.props.exerciseList

        var clientExerciseTypeCounter = 0
        var serverExerciseTypeCounter = 0
        for (var i = 0; i < listOfObjs.length; i++) {
            var exercise = listOfObjs[i]
            if (exercise.exerciseType === "client") {
                rowsWithItemsClient.push(<CollapseItem key={rowsWithItemsClient.length}
                    id={exercise.id}
                    name={"Exercise " + (++clientExerciseTypeCounter)}
                    //file={exercise.uploadedfile}
                    //type={exercise.exerciseType}
                    //expectedClientEntryPoint={exercise.expectedClientEntryPoint}
                    //description={exercise.description}
                    getExerciseByID={this.getExerciseByID} />)
            }
            else if (exercise.exerciseType === "clientserver") {
                rowsWithItemsClientServer.push(<CollapseItem key={rowsWithItemsClientServer.length}
                    id={exercise.id}
                    name={"Exercise " + (++serverExerciseTypeCounter)}
                    //file={exercise.uploadedfile}
                    //type={exercise.exerciseType}
                    //expectedClientEntryPoint={exercise.expectedClientEntryPoint}
                    //description={exercise.description}
                    getExerciseByID={this.getExerciseByID} />)
            }
        }

        if (rowsWithItemsClientServer.length === 0)
            rowsWithItemsClientServer.push(<div key={0} className="noExercises">There is no exercise</div>)

        if (rowsWithItemsClient.length === 0)
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