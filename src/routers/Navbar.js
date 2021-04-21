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
                            <li>
                                <Link to="/admin">Admin</Link>
                            </li>,
                            <li>
                                <Link to="/addPost">New post</Link>
                            </li>,
                            <li>
                                <Link to="/addCategory">New category</Link>
                            </li>,
                            <li>
                                <div style={{ cursor: "pointer" }} onClick={ this.onLogout.bind(this) }>Logout</div>
                            </li>
                        ] : (
                            <li>
                                <Link to="/login">login</Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
        )
    }
}
  