import React, { Component } from 'react'

class Footer extends Component {
    render() {
        var date = new Date();
        const currentYear = date.getFullYear();
        return (
            <div className="myFooter">
                <p>&copy; {currentYear} Carla Augusto</p>
            </div>
        );
    }
}
export default Footer