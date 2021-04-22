import { Component } from "react";
import { getRessource } from "../services/api_service";
import { retrieveData, TOKENID } from "../services/localStorage";
import './style/EntityItem.css'

export default class PostItem extends Component {
    state = {
        post: {},
        isLogin: false
    }

    componentDidMount() {
        const { itemId } = this.props

        this.setState({ isLogin: retrieveData(TOKENID) !== null })

        if (itemId) {
            getRessource('post', itemId)
                .then(res => this.setState({ post: res }))
                .catch(err => console.log("Error:", err))
        }
    }

    render() {
        if (!this.props.itemId) {
            return null
        }
        
        const { post, isLogin } = this.state
        const { _id, title, title_description, image } = post
        const DEFAULT_IMAGE = "https://e7.pngegg.com/pngimages/160/667/png-clipart-album-icon-computer-icons-art-museum-ico-art-gallery-miscellaneous-photography.png"
        const itemLink = `/${ isLogin ? "editPost" : "post" }/${_id}`

        return (
            <div className="entityItem">
                <a className="itemLink" href={ itemLink } title={ title_description }>
                    <img className="itemImage" src={ image || DEFAULT_IMAGE } alt={ title }/>
                    <div className="itemContainer">
                        <h4>{ title }</h4>
                        <p>{ title_description }</p>
                    </div>
                </a>
            </div>
        )
    }
}