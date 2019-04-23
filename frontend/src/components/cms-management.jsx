import React, { Component } from 'react'
import Logo from './logo'
import Footer from './footer'
import axios from 'axios'
import Modal from './modal'
import ModalContent from './modalcontent'

var clieserRestApiHostName = 'https://clieser-restapi.herokuapp.com'

export default class Management extends Component {
    state = {
        displayModal: false,
        modalTitle: '',
        modalMessage: '',
        isConfirmationModalType: false,
        isLoggedIn: false
    }

    handleLogin = () => {
        var username = document.getElementById('username').value
        var password = document.getElementById('password').value
        console.log('eeee');
        axios.get(clieserRestApiHostName + '/user?username=' + username + "&password=" + password)
            .then(response => {

                console.log(response.data['succeed'])
                if (!response.data['succeed']) {
                    this.setState({
                        displayModal: true,
                        modalTitle: 'Notification',
                        modalMessage: response.data['info'],
                        isConfirmationModalType: false
                    })
                }
                else
                    this.props.history.push("/cms/management")
            })
    }

    renderEditExercises = () => {
        const { username } = this.props.match.params
        this.props.history.push("/cms/all-exercises/" + username)
    }

    renderTutorials = () => {
        const { username } = this.props.match.params
        this.props.history.push("/cms/all-tutorials/" + username)
    }

    handleCloseModal = () => {
        document.getElementById('modal-root').style.display = "none"
        this.setState({ displayModal: false })
    }

    componentDidUpdate() {
        if (this.state.displayModal === true) {
            document.getElementById('modal-root').style.display = "block"
            this.setState({ displayModal: false })
        }
    }

    componentDidMount() {
        if (this.state.displayModal === false) {
            document.getElementById('modal-root').classList.add("modal")
            document.getElementById('modal-root').style.display = "none"
        }

        /*const { username } = this.props.match.params

        axios.get(clieserRestApiHostName + '/session?username=' + username)
            .then(response => {
                if (response.data['loggedin']) {
                    this.setState({ isLoggedIn: true })
                }
            })*/

    }

    handleLogout = () => {
        this.props.history.push("/cms")
    }

    render() {
        /*if (!this.state.isLoggedIn) {
            const { username } = this.props.match.params

            axios.get(clieserRestApiHostName + '/session?username=' + username)
                .then(response => {
                    if (!response.data['loggedin']) {
                        this.props.history.push("/cms")
                    }
                })
        }*/

        return (
            <div>
                <div className="row">
                    <div className="col-sm-4"><Logo /></div>
                    <div className="col">
                        <div className="row alignRight">
                            <button className="btn btn-outline-secondary" type="button" onClick={this.handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
                <h2 className="myh2">Content Management Panel </h2>
                <div className="fullheight">
                    <div className="row bottomspace topspace">
                        <div className="col-sm-6">
                            <div className="elementCentered blurredElement panelOptions" onClick={this.renderEditExercises}>
                                <img src={process.env.PUBLIC_URL + '/imgs/exercises.png'} alt="exercises" className="img-fluid imageCentered" />
                                <h4 className="alignCenter"> Exercises</h4>
                                <p className="bluep" onClick={this.props.renderWriteClient}>Let's go  <img src={process.env.PUBLIC_URL + '/imgs/rarrow.png'} alt="arrow" width="15px" /></p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="elementCentered blurredElement panelOptions" onClick={this.renderTutorials}>
                                <img src={process.env.PUBLIC_URL + '/imgs/tutorials.png'} alt="tutorials" className="img-fluid imageCentered" />
                                <h4 className="alignCenter">Tutorials</h4>
                                <p className="bluep" onClick={this.props.renderWriteServer}>Let's go  <img src={process.env.PUBLIC_URL + '/imgs/rarrow.png'} alt="arrow" width="15px" /></p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <Modal children={
                    <ModalContent
                        title={this.state.modalTitle}
                        message={this.state.modalMessage}
                        isConfirmationModalType={this.state.isConfirmationModalType}
                        handleCloseModal={this.handleCloseModal} />
                } />
            </div>
        )
    }
}