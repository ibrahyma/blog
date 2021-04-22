import { Component } from "react";
import { getRessource } from "../../services/api_service";
import CategoryItem from "../CategoryItem/CategoryItem";
// import './CategoryPage.css'

export default class CategoryPage extends Component {
    state = {
        category: {}
    }

    componentDidMount() {
        const { itemId } = this.props

        if (itemId) {
            getRessource('category')
                .then(res => this.setState({ category: res }))
                .catch(err => console.log("Error:", err))
        }
    }

    render() {
        const { category } = this.state
        const { _id, title, image, description } = category

        return [
            <h2 className="pageTitle" key={0}>{ title || "Catégorie inexistante"}</h2>,
            <div className="categoryPage" key={1}>
            {
                // title ?
                    
                //     : <p className="warning">Aucune catégorie trouvée.</p>
            }
            </div>
        ]
    }
}