import { Component } from "react"
import CategoryAdmin from "../components/CategoryAdmin"
import PostAdmin from "../components/PostAdmin"
import { getRessources } from '../services/api_service'
import { retrieveData, TOKENID } from "../services/localStorage"

export default class AdminPage extends Component {
    state = {
        posts: [],
        categories: []
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

        getRessources("category")
            .then(res => {
                this.setState({ categories: res }) 
            })
            .catch(err => console.log(`Error: ${err}`))
    }

    render() {
        const { posts, categories } = this.state

        return [
            <h2>Admin</h2>,
            <div className="row">
                <div className="leftcolumn">
                {
                    categories.map((post, index) => (
                        <CategoryAdmin key={ index } itemId={ post._id }/>
                    ))
                }
                </div>
                <div className="rightcolumn">
                {
                    posts.map((post, index) => (
                        <PostAdmin key={ index } itemId={ post._id }/>
                    ))
                }
                </div>
            </div>
        ]
    } 
    
}