import { Component } from "react"
import { getRessource } from "../services/api_service"
import './style/Home.css'
import './style/Entity.css'
import { retrieveData, TOKENID } from "../services/localStorage"
import Button from "../components/Button"

export default class Category extends Component {
    state = {
        category: {},
        isLogin: false
    }

    componentDidMount() {
        const { itemId } = this.props

        this.setState({ isLogin: retrieveData(TOKENID) ? true : false })

        if (itemId) {
            getRessource('category', itemId)
                .then(res => this.setState({ category: res }))
                .catch(err => console.log("Error:", err))
        }
    }

    render() {
        const { category, isLogin } = this.state
        const { _id, title, image, description } = category
        const DEFAULT_IMAGE = "https://e7.pngegg.com/pngimages/160/667/png-clipart-album-icon-computer-icons-art-museum-ico-art-gallery-miscellaneous-photography.png"

        return (
            <section className="home">
                <div className="buttonList">
                    <Button className="logoButton" value={ <i className="gg-backspace"></i> } href="/"></Button>
                    { _id && isLogin && <Button className="logoButton bg-warning" value={ <i className="gg-pen txt-black"></i> } href={ `/editCategory/${_id}` }/> }
                    { _id && isLogin && <Button className="logoButton bg-danger" value={ <i className="gg-trash txt-white"></i> } href={ `/deleteCategory/${_id}` }/> }
                </div>
                <h2 className="pageTitle">{ title || "Catégorie inexistante"}</h2>
                {
                    title ?
                        <div className="entity">
                            <div className="entity__imageside">
                                <img src={ image || DEFAULT_IMAGE } alt={ title }/>
                            </div>
                            <p className="entity__description">{ description }</p>
                        </div>
                        : <p className="warning">Cette catégorie n'existe pas.</p>
                }
            </section>
        )
    }
}