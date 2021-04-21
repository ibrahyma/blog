import { Component } from "react";
import { createRessource, deleteRessource, getRessource, getRessources, updateRessource } from '../services/api_service'


export default class PostForm extends Component {
    state = {
        title: "",
        title_description: "",
        image: "",
        content: "",
        categories: []
    }

    componentDidMount() {
        if (this.props.itemId) {
            getRessource("post", this.props.itemId)
                .then(post => this.setState({ ...this.state, ...post }))
                .catch(err => console.log("Error: ", err))
        }
        
        getRessources("category")
            .then(categories => this.setState({ ...this.state, categories }))
            .catch(err => console.log("Error: ", err))
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSave() {
        const { title, title_description, image, content } = this.state
        const data = { title, title_description, image, content }

        if (this.props.itemId) {
            updateRessource('post', this.props.itemId, data)
            return
        }

        createRessource('post', data)
            .then(() => window.location = '/admin')
    }

    onDelete() {
        if (!window.confirm(`Confirm delete ?`)) {
            return
        }

        deleteRessource('post', this.props.itemId)
            .then(() => window.location = '/admin')
    }

    render() {
        const { title, title_description, image, content, categories } = this.state
        
        return [
            this.props.itemId && <button onClick={ this.onDelete.bind(this) }>Delete post</button>,
            <div className="formPost">
                <select name="category">
                {
                    categories.map(category => <option value={ category.id }>{ category.title }</option>)
                }
                </select>
                <input type="text" placeholder="title" name="title" value={ title } onChange={ this.onChange.bind(this) }/>
                <input type="text" placeholder="description" name="title_description" value={ title_description } onChange={ this.onChange.bind(this) }/>
                <input type="text" placeholder="image" name="image" value={ image } onChange={ this.onChange.bind(this) }/>
                <textarea placeholder="content" name="content" value={ content } onChange={ this.onChange.bind(this) }></textarea>
                <button onClick={ this.onSave.bind(this) }>Save</button>
            </div>
        ]
    }
}