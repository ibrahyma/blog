import { useParams } from "react-router";
import Post from "../components/Post";

export default function CategoryPage(props) {
    const { id } = useParams();

    return (
        <Post itemId={ id }/>
    )
}