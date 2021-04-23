import { Component } from "react";
import { createRessource, deleteRessource, getRessource, updateRessource } from '../services/api_service'
import { retrieveData, TOKENID } from "../services/localStorage";
import Button from "./Button";

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

    onDelete(e) {
        if (window.confirm(`Tu es sûr de vouloir supprimer cette catégorie ?`)) {
            deleteRessource('category', this.props.itemId)
                .then(() => window.location = '/')
                .catch(err => console.log("Error: ", err))
        }

        e.preventDefault()
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
        const { _id, title, image, description } = this.state
        
        return [
            
            <form className="form home" onSubmit={ this.onSave.bind(this) }>
                <div className="buttonList">
                    <Button className="logoButton" value={ <i className="gg-backspace"></i> } href={ `/category/${_id}` }></Button>
                    { _id && <Button className="logoButton bg-danger" value={ <i className="gg-trash txt-white"></i> } onClick={ this.onDelete.bind(this) }/> }
                </div>
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
                    <Button className="realButton" value="Save"/>
                </div>                
            </form>
        ]
    }
}