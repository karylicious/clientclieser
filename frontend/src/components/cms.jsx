import React, { Component } from 'react'
import Logo from './logo'
import Footer from './footer'
import axios from 'axios'
import Modal from './modal'
import ModalContent from './modalcontent'

var clieserRestApiHostName = 'https://clieser-restapi.herokuapp.com'

export default class CMS extends Component {

    state = {
        displayModal: false,
        modalTitle: '',
        modalMessage: '',
        isConfirmationModalType: false
    }

    handleLogin = () => {
        var username = document.getElementById('username').value
        var password = document.getElementById('password').value

        axios.get(clieserRestApiHostName + '/user?username=' + username + "&password=" + password)
            .then(response => {
                if (!response.data['succeed']) {
                    this.setState({
                        displayModal: true,
                        modalTitle: 'Notification',
                        modalMessage: response.data['info'],
                        isConfirmationModalType: false
                    })
                }
                else {
                    axios.put(clieserRestApiHostName + '/session?username=' + username + "&loggedin=true")
                        .then(response => {
                            this.props.history.push("/cms/management/" + username)
                        })
                }
            })
    }


    handleCloseModal() {
        document.getElementById('modal-root').style.display = "none"
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
        axios.put(clieserRestApiHostName + '/session?username=admin&loggedin=false')
    }

    render() {
        return (
            <div>
                <div className="elementCentered">
                    <div className="container">
                        <div className="row alignRowCenter">
                            <Logo />
                        </div>
                        <div className="row alignRowCenter">
                            <h2>Login</h2>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Username</label>
                                <input className="form-control myinputtext" id="username" type="text" defaultValue="admin" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Password</label>
                                <input className="form-control myinputtext" id="password" type="password" />
                            </div>
                        </div>
                        <div className="textright bottomspace">
                            <button className="mybtn" onClick={this.handleLogin}>Login</button>
                        </div>
                    </div>

                </div>
                <Footer />
                <Modal children={
                    <ModalContent
                        title={this.state.modalTitle}
                        message={this.state.modalMessage}
                        isConfirmationModalType={false}
                        handleCloseModal={this.handleCloseModal} />
                } />
            </div>
        )
    }
}
