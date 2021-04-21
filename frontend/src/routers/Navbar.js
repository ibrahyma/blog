import { Component } from "react";
import { logout } from '../services/api_service'
import { retrieveData, TOKENID } from "../services/localStorage";
import './Navbar.css';

export default class Navbar extends Component {
    state = {
        isLogin: false
    }

    onLogout(e) {
        logout()
        window.location = "/"
    }

    componentDidMount() {
        this.setState({ isLogin: retrieveData(TOKENID) ? true : false })
    }

    render() {
        return (
            "Navbar"
        )
    }
}
  