import { Component } from "react"
import CategoryList from "../components/CategoryList"
import PostList from "../components/PostList"
import { getRessources } from "../services/api_service"
import './style/Home.css'

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
        return (
            <section className="home main">
                <CategoryList/>
                <PostList/>
            </section>
        )
    } 
}