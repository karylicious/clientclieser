import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {

    openNav() {
        document.getElementById("myNav").style.width = "100%"
    }

    closeNav() {
        document.getElementById("myNav").style.width = "0%"
    }

    render() {
        return (
            <div>
                <div className="topnav" id="myTopnav">
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink to="/theory">Theory</NavLink>
                    <NavLink to="/development">Development</NavLink>
                    <NavLink to="/validator">Validator</NavLink>
                    <NavLink to="/exercises">Exercises</NavLink>
                    <a href="https://uowenabled.herokuapp.com/">EnAbled</a>
                    <a href="https://learning.westminster.ac.uk/">Blackboard</a>
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
                        <NavLink to="/theory" onClick={this.closeNav}><span>Theory</span></NavLink>
                        <NavLink to="/development" onClick={this.closeNav}><span>Development</span></NavLink>
                        <NavLink to="/validator" onClick={this.closeNav}><span>Validator</span></NavLink>
                        <NavLink to="/exercises" onClick={this.closeNav}><span>Exercises</span></NavLink>
                        <a href="https://uowenabled.herokuapp.com/">EnAbled</a>
                        <a href="https://learning.westminster.ac.uk/">Blackboard</a>
                        <NavLink to="/about" onClick={this.closeNav}><span>About</span></NavLink>
                    </div>
                </div>
            </div>
        )
    }
} 