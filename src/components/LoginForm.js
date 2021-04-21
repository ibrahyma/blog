import { Component } from "react";
import crypto from 'crypto'
import { login } from '../services/api_service'
import { storeData, TOKENID } from "../services/localStorage";

export default class LoginForm extends Component {
    state = {
        username: "",
        password: ""
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    connectUser() {
        login({ email: this.state.username, password: this.encodedPassword() })
            .then(res => {
                if (res.status === 200) {
                    storeData(TOKENID, res.response.token)
                    window.location = "/admin"
                }
            })
            .catch(error => console.log("Error:", error))
    }

    encodedPassword() {
        return crypto.createHash("sha512").update(this.state.password.trim()).digest("base64")
    }

    render() {
        const { username, password } = this.state
        
        return (
            <div className="form">
                <div className="form__field">
                    <label for="username">Username</label>
                    <input type="text" placeholder="username" name="username" value={ username } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <label for="password">Password</label>
                    <input type="password" placeholder="password" name="password" value={ password } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <button onClick={ this.connectUser.bind(this) }>Login</button>
                </div>
            </div>
        )
    }
}