import React, { Component } from 'react'

class ModalContent extends Component {
    renderButtons = () => {
        if (this.props.isConfirmationModalType === true) {
            return (
                <div>
                    <button className="btn btn-outline-secondary" type="button" onClick={this.props.handleConfirmation}>Yes</button>  <button className="btn btn-outline-secondary" type="button" onClick={this.props.handleCloseModal}>No</button>
                </div>
            )
        }
        else if (this.props.isConfirmationModalType === false) {
            return (
                <div>
                    <button className="btn btn-outline-secondary" type="button" onClick={this.props.handleCloseModal}>OK</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="modal-content">
                <div className="container paddingZero">
                    <div className="row modal-header">
                        <div className="col-sm-4">{this.props.title}</div>
                        <div className="col-sm-2"><span className="closeModal" onClick={this.props.handleCloseModal}>&times;</span></div>
                    </div>
                    <div className="row padding20">
                        {this.props.message}
                    </div>
                    <div className="row modal-footer">
                        {this.renderButtons()}
                    </div>
                </div>
            </div>
        );
    }
}
export default ModalContent