import { Component } from "react"
import PostAdmin from "../components/PostAdmin"
import { getRessources } from '../services/api_service'
import { retrieveData, TOKENID } from "../services/localStorage"

export default class AdminPage extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        const token = retrieveData(TOKENID)

        if (!token) {
            window.location = '/login'
        }
        
        getRessources("post")
            .then(res => {
                this.setState({ posts: res }) 
            })
            .catch(err => console.log(`Error: ${err}`))
    }

    render() {
        const { posts } = this.state

        return (
            <div className="row">
                <h2>Admin</h2>
                <a href="/addCategory">Add category</a>
                <div className="leftcolumn">
                {
                    posts.map((post, index) => (
                        <PostAdmin key={ index } itemId={ post._id }/>
                    ))
                }
                </div>
            </div>
        )
    } 
    
}