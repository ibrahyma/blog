import { Component } from "react";
import { getRessources } from "../services/api_service";
import PostItem from "./PostItem";
import './style/EntityList.css'

export default class PostList extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        getRessources('post')
            .then(res => this.setState({ posts: res }))
            .catch(err => console.log("Error:", err))
    }

    render() {
        const { posts } = this.state

        return (
            <section className="entityListContainer">
                <h2 className="pageTitle">Posts</h2>
                <div className="entityList" >
                {
                    posts.length > 0 ?
                        posts.map((post, i) => <PostItem key={i} itemId={ post._id }/>)
                        : <p className="warning">Aucun post trouvé.</p>
                }
                </div>
            </section>
            
        )
    }
}