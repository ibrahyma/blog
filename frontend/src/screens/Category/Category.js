import { Component } from "react"
import { getRessource } from "../../services/api_service"
import '../Home/Home.css'
import '../Category/Category.css'

export default class Category extends Component {
    state = {
        category: {}
    }

    componentDidMount() {
        const { itemId } = this.props

        if (itemId) {
            getRessource('category', itemId)
                .then(res => this.setState({ category: res }))
                .catch(err => console.log("Error:", err))
        }
    }

    render() {
        const { category } = this.state
        const { _id, title, image, description } = category
        const DEFAULT_IMAGE = "https://e7.pngegg.com/pngimages/160/667/png-clipart-album-icon-computer-icons-art-museum-ico-art-gallery-miscellaneous-photography.png"

        return (
            <section className="home">
                <h2 className="pageTitle">{ title || "Catégorie inexistante"}</h2>
                {
                    title ?
                        <div className="category">
                            <div className="category__imageside">
                                <img src={ image || DEFAULT_IMAGE } alt={ title }/>
                            </div>
                            <p className="category__description">{ description }</p>
                        </div>
                        : <p className="warning">Aucune catégorie trouvée.</p>
                }
            </section>
        )
    }
}