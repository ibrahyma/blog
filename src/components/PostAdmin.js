import React, { Component } from 'react'
import { getRessource } from '../services/api_service'

export default class PostAdmin extends Component {
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
        
        const { _id, title, image } = this.state
    
        return (
            <div className="card">
            {
                <a href={ `/editPost/${ _id }` }>
                    { title && (<h2>{ title }</h2>) }
                    { image && (<img src={ image } alt="postImage" style={{ height: "200px" }}/>) }
                </a>
            }
            </div>
        )
    }
}