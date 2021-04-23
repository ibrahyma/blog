import { Component } from "react";
import Button from "../components/Button"
import { createRessource, deleteRessource, getRessource, getRessources, updateRessource } from "../services/api_service";
import { retrieveData, TOKENID } from "../services/localStorage";

export default class PostForm extends Component {
    state = {
        title: "",
        title_description: "",
        image: "",
        content: "",
        category: null,
        categories: []
    }
    
    componentDidMount() {
        if (!retrieveData(TOKENID)) {
            window.location = "/login"
        }
    
        if (this.props.itemId) {
            getRessource("post", this.props.itemId)
                .then(res => this.setState({ ...res }))
                .catch(err => console.log("Error: ", err))
        }
        
        getRessources("category")
            .then(res => this.setState({ categories: res }))
            .catch(err => console.log("Error: ", err))
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    onSelectCategory(e) {
        getRessource('category', e.target.value)
            .then(res => {
                if (res._id) {
                    this.setState({ category: res })
                    return
                }
    
                this.setState({ category: null })
            })
            .catch(err => console.log("Error: ", err))
    }
    
    onSave(e) {
        e.preventDefault()

        const { title, title_description, image, content, category } = this.state
        const data = { title, title_description, image, content, category }
    
        if (this.props.itemId) {
            updateRessource('post', this.props.itemId, data)
                .then(() => window.location = '/')
                .catch(err => console.log("Error: ", err))
            return
        }
    
        createRessource('post', data)
            .then(() => window.location = '/')
            .catch(err => console.log("Error: ", err))
    }
    
    onDelete() {
        if (window.confirm(`Tu es sûr de vouloir supprimer ce post ?`)) {
            deleteRessource('post', this.props.itemId)
            .then(() => window.location = '/')
            .catch(err => console.log("Error: ", err))
        }
    }
    
    render() {
        const { _id, title, title_description, image, content, categories, category } = this.state
    
        return (
            <form className="form home" method="POST" onSubmit={ this.onSave.bind(this) }>
                <div className="buttonList">
                    <Button className="logoButton" value={ <i className="gg-backspace"></i> } href={ `/post/${_id}` }></Button>
                    { _id && <Button className="logoButton bg-danger" value={ <i className="gg-trash txt-white"></i> } onClick={ this.onDelete.bind(this) }/> }
                </div>
                <h2 className="pageTitle">{ this.props.itemId ? "Modifier le" : "Nouveau" } post</h2>
                <div className="form__field">
                    <select className="field__input" name="category" onChange={ this.onSelectCategory.bind(this) }>
                        <option value="">Choisir une catégorie :</option>
                        {
                            categories.map(cat => <option value={ cat._id } selected={ category === cat._id }>{ cat.title }</option>)
                        }
                    </select>
                </div>
                <div className="form__field">
                    <input className="field__input" type="text" placeholder="Titre" name="title" value={ title } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <input className="field__input" type="text" placeholder="Description" name="title_description" value={ title_description } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <input className="field__input" type="text" placeholder="Image" name="image" value={ image } onChange={ this.onChange.bind(this) } inputMode="url"/>
                </div>
                <div className="form__field">
                    <textarea className="field__input" placeholder="content" name="content" value={ content } onChange={ this.onChange.bind(this) }></textarea>
                </div>
                <div className="form__field">
                    <Button className="realButton" value="Save"/>
                </div>
            </form>
        )
    }
}