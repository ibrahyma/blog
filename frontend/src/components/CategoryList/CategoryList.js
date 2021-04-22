import { Component } from "react";
import { getRessources } from "../../services/api_service";
import CategoryItem from "../CategoryItem/CategoryItem";
import './CategoryList.css'

export default class CategoryList extends Component {
    state = {
        categories: []
    }

    componentDidMount() {
        getRessources('category')
            .then(res => this.setState({ categories: res }))
            .catch(err => console.log("Error:", err))
    }

    render() {
        const { categories } = this.state

        return [
            <h2 className="pageTitle" key={0}>Catégories</h2>,
            <div className="categoryList" key={1}>
            {
                categories.length > 0 ?
                    categories.map((category, i) => <CategoryItem key={i} itemId={ category._id }/>)
                    : <p className="warning">Aucune catégorie trouvée.</p>
            }
            </div>
        ]
    }
}