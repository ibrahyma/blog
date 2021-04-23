import { Component } from "react";
import crypto from 'crypto'
import Button from "../components/Button";
import { login } from "../services/api_service";
import { retrieveData, storeData, TOKENID } from "../services/localStorage";

export default class LoginForm extends Component {
    state = {
        username: "",
        password: "",
        isLogin: false
    }
    
    componentDidMount() {
        this.setState({ isLogin: retrieveData(TOKENID) ? true : false })
    }

    connectUser(e) {
        e.preventDefault()

        login({ email: this.state.username, password: this.encodedPassword() })
            .then(res => {
                if (res.status === 200) {
                    storeData(TOKENID, res.response.token)
                    window.location = "/"
                }
                
            })
            .catch(() => window.alert("Identifiant et/ou mot de passe incorrect."))
    }

    encodedPassword() {
        return crypto.createHash("sha512").update(this.state.password.trim()).digest("base64")
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { username, password, isLogin } = this.state
        
        if (isLogin) {
            window.location = "/"
        }

        return (
            <form className="form home" method="POST" onSubmit={ this.connectUser.bind(this) }>
                <h2 className="pageTitle">Connexion</h2>
                <div className="form__field">
                    <input className="field__input" type="text" placeholder="Nom d'utilisateur" name="username" value={ username } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <input className="field__input" type="password" placeholder="Mot de passe" name="password" value={ password } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <Button className="realButton" value="Connexion"/>
                </div>
            </form>
        )
    }
}