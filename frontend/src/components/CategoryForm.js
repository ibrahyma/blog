import { Component } from "react";
import { createRessource, deleteRessource, getRessource, updateRessource } from '../services/api_service'
import { retrieveData, TOKENID } from "../services/localStorage";

export default class CategoryForm extends Component {
    state = {
        title: "",
        image: "",
        description: ""
    }

    componentDidMount() {
        if (!retrieveData(TOKENID)) {
            window.location = "/login"
        }

        if (this.props.itemId) {
            getRessource("category", this.props.itemId)
                .then(category => this.setState({ ...this.state, ...category }))
                .catch(err => console.log("Error: ", err))
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onDelete() {
        if (!window.confirm(`Confirm delete ?`)) {
            return
        }

        deleteRessource('category', this.props.itemId)
            .then(() => window.location = '/')
    }

    onSave(e) {
        e.preventDefault()

        const { title, image, description } = this.state
        const data = { title, image, description }
        
        if (this.props.itemId) {
            updateRessource('category', this.props.itemId, data)
                .then(() => window.location = '/')
            return
        }

        createRessource('category', data)
            .then(() => window.location = '/')
    }

    render() {
        const { title, image, description } = this.state
        
        return [
            
            <form className="form" onSubmit={ this.onSave.bind(this) }>
                <h2>{ this.props.itemId ? "Modifier la" : "Nouvelle" } catégorie</h2>
                <div className="form__field">
                    <input type="text" className="field__input" placeholder="Titre" name="title" value={ title } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <input type="text" className="field__input" placeholder="image" name="image" value={ image } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <input type="text" className="field__input" placeholder="description" name="description" value={ description } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <button >Save</button>
                </div>                
            </form>
        ]
    }
}