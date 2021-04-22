import { Component } from "react";
import { getRessources } from "../../services/api_service";
import PostItem from "../PostItem/PostItem";

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

        return posts.length > 0 ?
            posts.map(post => <PostItem itemId={ post._id }/>)
            : <p className="warning">Aucun poste trouvé.</p>
    }
}