import { Component } from "react";
import { getRessource } from "../../services/api_service";
import { retrieveData, TOKENID } from "../../services/localStorage";
import './CategoryItem.css'

export default class CategoryItem extends Component {
    state = {
        category: {},
        isLogin: false
    }

    componentDidMount() {
        const { itemId } = this.props

        this.setState({ isLogin: retrieveData(TOKENID) !== null })

        if (itemId) {
            getRessource('category', itemId)
                .then(res => this.setState({ category: res }))
                .catch(err => console.log("Error:", err))
        }
    }

    render() {
        if (!this.props.itemId) {
            return null
        }
        
        const { category, isLogin } = this.state
        const { _id, title, image, description } = category
        const DEFAULT_IMAGE = "https://e7.pngegg.com/pngimages/160/667/png-clipart-album-icon-computer-icons-art-museum-ico-art-gallery-miscellaneous-photography.png"
        const itemLink = `/${ isLogin ? "editCategory" : "category" }/${_id}`

        return (
            <div className="categoryItem">
                <a className="itemLink" href={ itemLink }>
                    <img className="itemImage" src={ image || DEFAULT_IMAGE } alt={ title }/>
                    <div className="itemContainer">
                        <h4><b>{ title }</b></h4>
                        <p>{ description }</p>
                    </div>
                </a>
            </div>
        )
    }
}