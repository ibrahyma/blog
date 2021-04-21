import React, { Component } from 'react'
import { getRessource } from '../services/api_service'

export default class CategoryAdmin extends Component {
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
        
        const { _id, title, image } = this.state
    
        return (
            <div className="card">
            {
                <a href={ `/editCategory/${ _id }` }>
                    { title && (<h2>{ title }</h2>) }
                    { image && (<img src={ image } alt="categoryImage" style={{ height: "200px" }}/>) }
                </a>
            }
            </div>
        )
    }
}