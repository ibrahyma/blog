import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from '../services/api_service'
import './Navbar.css';

export default class Navbar extends Component {
    onLogout(e) {
        logout()
            .then(() => window.location = "/")
    }

    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {
                        this.props.isLogin ? [
                            <li style={{ position: "absolute", right: "80%", borderLeft: "5px solid #f1f1f1" }}>
                                <Link to="/admin">Admin</Link>
                            </li>,
                            <li style={{ position: "absolute", right: "60%", borderLeft: "5px solid #f1f1f1" }}>
                                <Link to="/addPost">New post</Link>
                            </li>,
                            <li style={{ position: "absolute", right: "40%", borderLeft: "5px solid #f1f1f1" }}>
                                <Link to="/category">Categories</Link>
                            </li>,
                            <li
                                style={{ position: "absolute", right: "15px", borderLeft: "5px solid #f1f1f1" }}>
                                <button onClick={ () => this.onLogout.bind(this) }>Logout</button>
                            </li>
                        ] : (
                            <li style={{ position: "absolute", right: "15px", borderLeft: "5px solid #f1f1f1" }}>
                                <Link to="/login">login</Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
        )
    }
}
  