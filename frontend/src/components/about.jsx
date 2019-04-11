import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'

class About extends Component {

    render() {
        return (
            <div>
                <div><TopContainer standardOpening={false} /></div>
                <div className="fullheight container bottomspace">
                    <h2 className="myh2">About Us</h2>
                    <h4>What is Clieser</h4>
                    <p>Clieser is a system designed to learn client server architecture concepts. It is mainly focused on development and use of soap web service in Java programming language. </p>
                    <hr />
                    <h4>Copyright</h4>
                    <p>All pages and content from Clieser may not be reproduced in any way without prior consent of the owner.</p>
                    <hr />
                    <h4>Privacy</h4>
                    <p>No user registration is required in order to use Clieser.<br />

                        By using the system validator you agree that Clieser use any of your submitted data to produce results and display it solely to you.<br />

                        After the use of the system validator no data submitted is kept.</p>
                </div>
                <div className="homeFooter"><Footer /></div>
            </div>
        )
    }
}
export default About