import React, { Component } from "react"
import Category from "../components/Category"
import Post from "../components/Post"
import { getRessources } from "../services/api_service"

export default class Home extends Component {
    state = {
        posts: [],
        categories: []
    }

    componentDidMount() {
        getRessources("post")
            .then(data => {
                this.setState({ posts: data }) 
            })
            .catch(err => console.log(`Error: ${err}`))

        getRessources("category")
            .then(data => {
                this.setState({ categories: data }) 
            })
            .catch(err => console.log(`Error: ${err}`))
    }

    render() {
        const { posts, categories } = this.state

        return [
            <h1>Home</h1>,
            <div className="row">
                <div className="leftcolumn">
                    <h2>Categories</h2>
                    {
                        categories.map(post => (
                            <Category itemId={ post._id }/>
                        ))
                    }
                </div>
                <div className="rightcolumn">
                    <h2>Posts</h2>
                    {
                        posts.map(post => (
                            <Post itemId={ post._id }/>
                        ))
                    }
                </div>
            </div>
        ]
    } 
}