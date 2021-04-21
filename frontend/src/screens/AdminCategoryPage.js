import { useParams } from "react-router"
import CategoryForm from "../components/CategoryForm";

export default function AdminCategoryPage(props) {
    const { id } = useParams();

    return (
        <CategoryForm itemId={ id }/>
    )
}