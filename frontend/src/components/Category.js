import { useParams } from "react-router";
import CategoryPage from "../screens/CategoryPage";
import { BASE_CLIENT_URL } from "../services/api_service";
import CategoryForm from "../screens/CategoryForm";

export default function Category(props) {
    const { id } = useParams()

    switch (window.location.href) {
        case `${BASE_CLIENT_URL}/editCategory/${id}`:
            return <CategoryForm itemId={ id }/>

        case `${BASE_CLIENT_URL}/category/${id}`:
            return <CategoryPage itemId={ id }/>

        default:
            window.location = "/" 
    }
}