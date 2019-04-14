import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {

    openNav() {
        document.getElementById("myNav").style.width = "100%";
    }

    closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }

    render() {
        return (
            <div>
                <div className="topnav" id="myTopnav">
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink to="/tutorials">Tutorials</NavLink>
                    <NavLink to="/client-server-system">Client Server System</NavLink>
                    <NavLink to="/validator">Validator</NavLink>
                    <NavLink to="/exercises">Exercises</NavLink>
                    <NavLink to="/about">About</NavLink>

                    <a href="javascript:void(0)" className="icon" onClick={this.openNav}>
                        <div className="menuicon"></div>
                        <div className="menuicon"></div>
                        <div className="menuicon"></div>
                    </a>
                </div>
                <div id="myNav" className="overlay">
                    <div className="overlay-content">
                        <NavLink exact to="/" onClick={this.closeNav}><span>Home</span></NavLink>
                        <NavLink to="/tutorials" onClick={this.closeNav}><span>Tutorials</span></NavLink>
                        <NavLink to="/client-server-system" onClick={this.closeNav}><span>Client Server System</span></NavLink>
                        <NavLink to="/validator" onClick={this.closeNav}><span>Validator</span></NavLink>
                        <NavLink to="/exercises" onClick={this.closeNav}><span>Exercises</span></NavLink>
                        <NavLink to="/about" onClick={this.closeNav}><span>About</span></NavLink>
                    </div>
                </div>
            </div>
        )
    }
} 