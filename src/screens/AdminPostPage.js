import PostForm from "../components/PostForm"
import { useParams } from "react-router"

export default function AdminPostPage(props) {
    const id = useParams();
    return (
        <PostForm itemId={ id }/>
    )
}