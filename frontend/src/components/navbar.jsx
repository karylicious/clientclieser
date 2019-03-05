import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
    render() {

        return (
            <div>
                <div className="topnav" id="myTopnav">
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink to="/tutorial">Tutorial</NavLink>
                    <NavLink to="/client-server-system">Client Server System</NavLink>
                    <NavLink to="/validator">Validator</NavLink>
                    <NavLink to="/about">About</NavLink>

                    <a href="javascript:void(0)" className="icon" onClick={this.openNav}>
                        <div className="menuicon"></div>
                        <div className="menuicon"></div>
                        <div className="menuicon"></div>
                    </a>


                </div>
                <div id="myNav" className="overlay">
                    <div className="overlay-content">
                        <NavLink exact to="/"><span onClick={this.closeNav}>Home</span></NavLink>
                        <NavLink to="/tutorial"><span onClick={this.closeNav}>Tutorial</span></NavLink>
                        <NavLink to="/client-server-system"><span onClick={this.closeNav}>Client Server System</span></NavLink>
                        <NavLink to="/validator"><span onClick={this.closeNav}>Validator</span></NavLink>
                        <NavLink to="/about"><span onClick={this.closeNav}>About</span></NavLink>
                    </div>
                </div>
            </div>
        );
    }
    openNav() {
        document.getElementById("myNav").style.width = "100%";
    }

    closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }
}
export default Navbar