import React, { Component } from 'react'
import { getRessource } from '../services/api_service'

export default class Category extends Component {
    state = null
    
    constructor(props) {
        super(props)
        
        if (props.item) {
            this.setState(props.item)
        }
    }

    componentDidMount() {
        if (!this.state && this.props.itemId) {
            getRessource("category", this.props.itemId)
                .then(category => this.setState(category))
                .catch(err => console.log(`Error: ${err}`))
        }
    }
    
    render() {
        if (!this.state) {
            return null
        }
        
        const { _id, title, description, image, content } = this.state
    
        return (
            <div className="card">
            {
                <a href={ `/category/${ _id }` }>
                    { title && (<h2>{ title }</h2>) }
                    { description && (<h5>{ description }</h5>) }
                    { image && (<img src={ image } alt="categoryImage" style={{ height: "200px" }}/>) }
                </a>
            }
            </div>
        )
    }
}