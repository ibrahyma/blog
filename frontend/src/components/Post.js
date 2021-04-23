import { useParams } from "react-router";
import PostForm from "../screens/PostForm";
import PostPage from "../screens/PostPage";
import { BASE_CLIENT_URL } from "../services/api_service";

export default function Post(props) {
    const { id } = useParams()

    switch (window.location.href) {
        case `${BASE_CLIENT_URL}/editPost/${id}`:
            return <PostForm itemId={ id }/>

        case `${BASE_CLIENT_URL}/post/${id}`:
            return <PostPage itemId={ id }/>

        default:
            window.location = "/" 
    }
}