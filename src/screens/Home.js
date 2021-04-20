import React, { Component } from "react"
import Post from "../components/Post"
import { getRessources } from "../services/api_service"

export default class Home extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        getRessources("post")
            .then(postList => {
                this.setState({ posts: postList }) 
            })
            .catch(err => console.log(`Error: ${err}`))
    }

    render() {
        const { posts } = this.state

        return (
            <div className="row">
                <div className="leftcolumn">
                    {
                        posts.map(post => (
                            <Post itemId={ post._id }/>
                        ))
                    }
                </div>
            </div>
        )
    } 
}