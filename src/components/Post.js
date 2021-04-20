import React, { Component } from 'react'
import { getRessource } from '../services/api_service'

export default class Post extends Component {
    state = null
    
    constructor(props) {
        super(props)
        
        if (props.item) {
            this.setState(props.item)
        }
    }

    componentDidMount() {
        if (!this.state && this.props.itemId) {
            getRessource("post", this.props.itemId)
                .then(post => this.setState(post))
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
                <a href={ `/post/${ _id }` }>
                    { title && (<h2>{ title }</h2>) }
                    { description && (<h5>{ description }</h5>) }
                    { image && (<img src={ image } alt="postImage" style={{ height: "200px" }}/>) }
                    { content && (<p>{ content }</p>) }
                </a>
            }
            </div>
        )
    }
}