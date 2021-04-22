import { Component } from "react"
import { getRessource } from "../services/api_service"
import './style/Home.css'
import './style/Entity.css'
import Button from "../components/Button"
import { retrieveData, TOKENID } from "../services/localStorage"

export default class Post extends Component {
    state = {
        post: {},
        isLogin: false
    }

    componentDidMount() {
        const { itemId } = this.props

        this.setState({ isLogin: retrieveData(TOKENID) ? true : false })

        if (itemId) {
            getRessource('post', itemId)
                .then(res => this.setState({ post: res }))
                .catch(err => console.log("Error:", err))
        }
    }

    render() {
        const { post, isLogin } = this.state
        const { _id, title, title_description, image, content } = post
        const DEFAULT_IMAGE = "https://e7.pngegg.com/pngimages/160/667/png-clipart-album-icon-computer-icons-art-museum-ico-art-gallery-miscellaneous-photography.png"

        return (
            <section className="home">
                <div className="buttonList">
                    <Button className="realButton" value={ <i className="gg-backspace"></i> } href="/"></Button>
                    { _id && isLogin && <Button className="realButton bg-warning" value={ <i className="gg-pen txt-black"></i> } href={ `/editPost/${_id}` }/> }
                    { _id && isLogin && <Button className="realButton bg-danger" value={ <i className="gg-trash txt-white"></i> } href={ `/deletePost/${_id}` }/> }
                </div>
                <h2 className="pageTitle">{ title || "Catégorie inexistante" }</h2>
                { title_description && <h3 className="subtitle">{ title_description }</h3> }
                {
                    title ?
                        <div className="entity">
                            <div className="entity__imageside">
                                <img src={ image || DEFAULT_IMAGE } alt={ title }/>
                            </div>
                            <p className="entity__description">{ content }</p>
                        </div>
                        : <p className="warning">Ce post n'existe pas.</p>
                }
            </section>
        )
    }
}