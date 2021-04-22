import { useParams } from "react-router";
import Post from "../screens/Post";

export default function PostPage(props) {
    const { id } = useParams()

    return <Post itemId={ id }/>
}