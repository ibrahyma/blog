import { useParams } from "react-router";
import Category from "../screens/Category";

export default function CategoryPage(props) {
    const { id } = useParams()

    return <Category itemId={ id }/>
}