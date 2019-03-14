import React, { Component } from 'react'

class NotFound extends Component {

    componentDidMount() {
        var mainContainer = document.getElementById('main')
        mainContainer.style.display = "none"
    }

    render() {
        return (
            <div className="container">
                <h1>Page not found</h1>
                <p>We're sorry, we couldn't find the page you requested.</p>

            </div>
        );
    }
}
export default NotFound