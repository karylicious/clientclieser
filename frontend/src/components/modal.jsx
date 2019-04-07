import { Component } from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root')

export default class Modal extends Component {

    /*constructor() {
        super()
        console.log("heeey")
        this.el = document.createElement('div')
    }

    componentDiMount = () => {
        console.log("moount")
        modalRoot.appendChild(this.el)
    }

    componentWillUnmount = () => {
        console.log("uuunmoount")
        modalRoot.removeChild(this.el)
    }*/
    render() {
        return ReactDOM.createPortal(this.props.children, modalRoot)
    }

}