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
        
        const { _id, title, title_description, image, content } = this.state
        const DEFAULT_IMG = "https://www.phoca.cz/images/projects/phoca-gallery-r.png"
    
        return (
            <div className="card">
            {
                <a href={ `/post/${ _id }` }>
                    { title && (<h2>{ title }</h2>) }
                    { title_description && (<h5>{ title_description }</h5>) }
                    <img src={ image !== "" ? image : DEFAULT_IMG } alt="postImage"/>
                    { content && (<p>{ content }</p>) }
                </a>
            }
            </div>
        )
    }
}