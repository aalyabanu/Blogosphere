import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = { isLoggedIn: false };
    }

    //displaying login or logout
    componentDidMount() {
        if (sessionStorage.getItem("isLoggedIn") === "true") {
            this.setState((prevState) => {
                if (!prevState.isLoggedIn) {
                    return { isLoggedIn: true };
                }
            })
        }

        if (sessionStorage.getItem("isLoggedIn") === "false") {
            this.setState((prevState) => {
                if (prevState.isLoggedIn) {
                    return { isLoggedIn: false }
                }
            })
        }
    }
    navSlide() {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li')
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        })
        //Burger Animation
        burger.classList.toggle('toggle');

    }
    handleNavbar() {

    }
    render() {
        return (
            // <header className="toolbar">
            <nav >
                <Link to="/posts" className="logo">
                    <h1> Blogosphere</h1>
                </Link>

                <button onClick={this.navSlide} className="burger">
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </button>

                <ul className="nav-links">
                    <li className="navbar-item">
                        <Link to="/posts" className="nav-link" >Posts</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/new" className="nav-link" onClick={this.handleNavbar}>New Post</Link>
                    </li>

                    {!this.state.isLoggedIn ? (
                        <span><li className="navbar-item">
                            <Link to="/login" className="nav-link" onClick={this.handleNavbar}>Login</Link>
                        </li>
                            <li className="navbar-item">
                                <Link to="/register" className="nav-link" onClick={this.handleNavbar}>Register</Link>
                            </li>
                        </span>


                    ) : (
                            <li className="navbar-item">
                                <Link to="/logout" className="nav-link" onClick={() => {
                                    window.sessionStorage.removeItem("isLoggedIn");
                                    window.sessionStorage.removeItem("username");
                                    window.location = "/posts";
                                }}>Logout</Link>
                            </li>
                        )}
                </ul>

            </nav>
            // </header>
        )
    }
}
export default Navbar;