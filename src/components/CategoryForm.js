import { Component } from "react";
import { createRessource, getRessource, updateRessource } from '../services/api_service'

export default class CategoryForm extends Component {
    state = {
        title: "",
        image: "",
        description: ""
    }

    componentDidMount() {
        if (this.props.itemId) {
            getRessource("category", this.props.itemId)
                .then(category => this.setState({ ...this.state, ...category }))
                .catch(err => console.log("Error: ", err))
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSave() {
        const { title, image, description } = this.state
        const data = { title, image, description }
        
        if (this.props.itemId) {
            updateRessource('category', this.props.itemId, data)
                .then(() => window.location = '/admin')
            return
        }

        createRessource('category', data)
            .then(() => window.location = '/admin')
    }

    render() {
        const { title, image, description } = this.state
        
        return (
            <div className="formPost">
                <input type="text" placeholder="title" name="title" value={ title } onChange={ this.onChange.bind(this) }/>
                <input type="text" placeholder="image" name="image" value={ image } onChange={ this.onChange.bind(this) }/>
                <input type="text" placeholder="description" name="description" value={ description } onChange={ this.onChange.bind(this) }/>
                <button onClick={ this.onSave.bind(this) }>Save</button>
            </div>
        )
    }
}