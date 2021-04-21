import { Component } from "react";
import { createRessource, deleteRessource, getRessource, getRessources, updateRessource } from '../services/api_service'
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

    onSave() {
        const { title, title_description, image, content, category } = this.state
        const data = { title, title_description, image, content, category }

        if (this.props.itemId) {
            updateRessource('post', this.props.itemId, data)
                .then(() => window.location = '/admin')
                .catch(err => console.log("Error: ", err))
            return
        }

        createRessource('post', data)
            .then(() => window.location = '/admin')
            .catch(err => console.log("Error: ", err))
    }

    onDelete() {
        if (!window.confirm(`Confirm delete ?`)) {
            return
        }

        deleteRessource('post', this.props.itemId)
            .then(() => window.location = '/admin')
            .catch(err => console.log("Error: ", err))
    }

    render() {
        const { title, title_description, image, content, categories, category } = this.state

        return [
            <h2>{ this.props.itemId ? "Update" : "New" } post</h2>,
            this.props.itemId && <button onClick={ this.onDelete.bind(this) }>Delete post</button>,
            <div className="form">
                <select name="category" onChange={ this.onSelectCategory.bind(this) }>
                    <option value="">Select any category:</option>
                    {
                        categories.map(cat => <option value={ cat._id } selected={ category === cat._id }>{ cat.title }</option>)
                    }
                </select>
                <div className="form__field">
                    <input type="text" placeholder="title" name="title" value={ title } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <input type="text" placeholder="description" name="title_description" value={ title_description } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <input type="text" placeholder="image" name="image" value={ image } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="form__field">
                    <textarea placeholder="content" name="content" value={ content } onChange={ this.onChange.bind(this) }></textarea>
                </div>
                <div className="form__field">
                    <button onClick={ this.onSave.bind(this) }>Save</button>
                </div>
            </div>
        ]
    }
}