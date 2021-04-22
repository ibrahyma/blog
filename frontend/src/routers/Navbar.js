import { Component } from "react";
import Button from "../components/Button/Button";
import { logout } from '../services/api_service'
import { retrieveData, TOKENID } from "../services/localStorage";
import './Navbar.css';

export default class Navbar extends Component {
    state = {
        isLogin: false,
        navbarActive: false,
        navbarStyle: { transform: "translateY(-300%)" },
        menuIcon: "gg-menu"
    }

    onLogout(e) {
        logout()
        window.location = "/"
    }

    onToggleNavbar() {
        const { navbarActive } = this.state

        this.setState({
            navbarActive: !navbarActive,
            navbarStyle: { transform: `translateY(${navbarActive ? "-300%" : "0"})` },
            menuIcon: `gg-${navbarActive ? "menu" : "close"}`
        })
    }

    componentDidMount() {
        this.setState({ isLogin: retrieveData(TOKENID) ? true : false })
    }

    render() {
        const { isLogin, navbarStyle, menuIcon } = this.state
        
        return (
            <div className="navbar">
                <div className="navbar__header">
                    <Button className={ menuIcon } onClick={ this.onToggleNavbar.bind(this) }></Button>
                    <Button className="title" value="MyBlog" onClick={ this.onToggleNavbar.bind(this) }></Button>
                </div>
                <ul className="navbar__menu" style={ navbarStyle }>
                    <li><Button value="Home" href={ `/${isLogin && "admin"}` }/></li>
                    { isLogin || <li><Button value="Login" href="/login"/></li> }
                    {
                        isLogin && [
                            <li><Button value="New category" href="/createCategory"/></li>,
                            <li><Button value="New post" href="/createPost"/></li>,
                            <li><Button value="Logout" onClick={ this.onLogout.bind(this) }/></li>
                        ]
                    }
                </ul>
            </div>
        )
    }
}
  