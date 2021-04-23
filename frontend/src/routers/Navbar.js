import { Component } from "react";
import Button from "../components/Button";
import { logout } from '../services/api_service'
import { retrieveData, TOKENID } from "../services/localStorage";

export default class Navbar extends Component {
    state = {
        isLogin: false,
        navbarActive: false,
        navbarStyle: { transform: "translateY(-200%)" },
        menuIcon: "gg-menu"
    }

    componentDidMount() {
        this.setState({ isLogin: retrieveData(TOKENID) ? true : false })
    }

    onLogout(e) {
        logout()
        window.location = "/"
    }

    onToggleNavbar() {
        const { navbarActive } = this.state

        this.setState({
            navbarActive: !navbarActive,
            navbarStyle: { transform: `translateY(${navbarActive ? "-200%" : "0"})` },
            menuIcon: `gg-${navbarActive ? "menu" : "close"}`
        })
    }

    render() {
        const { isLogin, navbarStyle, menuIcon } = this.state
        
        return (
            <nav>
                <div className="navbar__header" onClick={ this.onToggleNavbar.bind(this) }>
                    <Button className={ menuIcon }></Button>
                    <Button className="menuTitle" value="iSmartphoneBlog"></Button>
                </div>
                <ul className="navbar__menu" style={ navbarStyle }>
                    <li><Button value="Accueil" href={ `/${isLogin && "admin"}` }/></li>
                    {
                        isLogin ? [
                            <li key="1"><Button value="Nouvelle catégorie" href="/createCategory"/></li>,
                            <li key="2"><Button value="Nouveau post" href="/createPost"/></li>,
                            <li key="3"><Button value="Déconnexion" onClick={ this.onLogout.bind(this) }/></li>
                        ] : <li key="4"><Button value="Connexion" href="/login"/></li>
                    }
                </ul>
            </nav>
        )
    }
}
  