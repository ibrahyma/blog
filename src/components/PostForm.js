import { Component } from "react";
import { createRessource, getRessource, updateRessource } from '../services/api_service'


export default class PostForm extends Component {
    state = {
        isEmpty: true,
        title: "",
        title_description: "",
        image: "",
        content: ""
    }

    componentDidMount() {
        if (this.props.itemId.id) {
            getRessource("post", this.props.itemId.id)
                .then(post => this.setState({ ...this.state, ...post }))
                .catch(err => console.log("Error: ", err))
        }
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

    render() {
        const { title, title_description, image, content } = this.state
        
        return (
            <div className="formPost">
                <input type="text" placeholder="title" name="title" value={ title } onChange={ this.onChange.bind(this) }/>
                <input type="text" placeholder="description" name="title_description" value={ title_description } onChange={ this.onChange.bind(this) }/>
                <input type="text" placeholder="image" name="image" value={ image } onChange={ this.onChange.bind(this) }/>
                <textarea placeholder="content" name="content" value={ content } onChange={ this.onChange.bind(this) }></textarea>
                <button onClick={ this.onSave.bind(this) }>Save</button>
            </div>
        )
    }
}