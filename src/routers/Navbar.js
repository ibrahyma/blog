import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from '../services/api_service'
import './Navbar.css';

export default class Navbar extends Component {
    onLogout(e) {
        logout()
        window.location = "/"
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
                            <li style={{ position: "absolute", right: "30%", borderLeft: "5px solid #f1f1f1" }}>
                                <Link to="/admin">Admin</Link>
                            </li>,
                            <li style={{ position: "absolute", right: "20%", borderLeft: "5px solid #f1f1f1" }}>
                                <Link to="/addPost">New post</Link>
                            </li>,
                            <li style={{ position: "absolute", right: "10%", borderLeft: "5px solid #f1f1f1" }}>
                                <Link to="/addCategory">New category</Link>
                            </li>,
                            <li
                                style={{ position: "absolute", right: "15px", borderLeft: "5px solid #f1f1f1", cursor: "pointer" }}>
                                <div onClick={ this.onLogout.bind(this) }>Logout</div>
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
  