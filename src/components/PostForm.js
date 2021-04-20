import { /* Component, */ useEffect } from "react";
import { useParams } from "react-router";
import { createRessource, getRessource, updateRessource } from '../services/api_service'

export default function PostForm(props) {
    // const [title, setTitle] = useState("")
    // const [title_description, setTitle_description] = useState("")
    // const [image, setImage] = useState("")
    // const [content, setContent] = useState("")
    var state = {
        title: "",
        title_description: "",
        image: "",
        content: ""
    }

    var render = (
        <div className="formPost">
            <input type="text" placeholder="title" name="title" value={ state.title } onChange={ onChange }/>
            <input type="text" placeholder="description" name="title_description" value={ state.title_description } onChange={ onChange }/>
            <input type="text" placeholder="image" name="image" value={ state.image } onChange={ onChange }/>
            <textarea placeholder="content" name="content" onChange={ onChange } value={ state.content }></textarea>
            <button onClick={ onSave }>Save</button>
        </div>
    )

    function setState(data) {
        state = { ...state, ...data }
        console.log("NEW STATE: ", state)
        console.log("NEW STATE title: ", state.title)
    }

    const { id } = useParams()


    function onSave() {
        const { title, title_description, image, content } = this.state
        const data = { title, title_description, image, content }

        if (!id) {
            updateRessource('post', id, data)
                .then(() => window.location = '/admin')

            return
        }

        createRessource('post', data)
            .then(() => window.location = '/admin')
    }

    function onChange(e) {
        setState({ [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (id) {
            getRessource("post", id)
                .then(post => setState(post))
                .catch(err => console.log("Error: ", err))
        }

        render = (
            <div className="formPost">
                <input type="text" placeholder="title" name="title" value={ state.title } onChange={ onChange }/>
                <input type="text" placeholder="description" name="title_description" value={ state.title_description } onChange={ onChange }/>
                <input type="text" placeholder="image" name="image" value={ state.image } onChange={ onChange }/>
                <textarea placeholder="content" name="content" onChange={ onChange } value={ state.content }></textarea>
                <button onClick={ onSave }>Save</button>
            </div>
        )
    })
        
    return render
}

// export default class PostForm extends Component {
//     state = {
//         title: "",
//         title_description: "",
//         image: "",
//         content: ""
//     }

//     componentDidMount() {
//         if (id) {
//             getRessource("post", this.props.itemId)
//                 .then(post => console.log(post))
//                 .catch(err => console.log("Error: ", err))
//         }
//     }

//     onChange(e) {
//         this.setState({ [e.target.name]: e.target.value })
//     }

//     onSave() {
//         const { title, title_description, image, content } = this.state
//         createRessource('post', { title, title_description, image, content })
//             .then(() => window.location = '/admin')
//     }

//     render() {
//         const { title, title_description, image, content } = this.state
        
//         return (
//             <div className="formPost">
//                 <input type="text" placeholder="title" name="title" value={ title } onChange={ this.onChange.bind(this) }/>
//                 <input type="text" placeholder="description" name="title_description" value={ title_description } onChange={ this.onChange.bind(this) }/>
//                 <input type="text" placeholder="image" name="image" value={ image } onChange={ this.onChange.bind(this) }/>
//                 <textarea placeholder="content" name="content" onChange={ this.onChange.bind(this) }>{ content }</textarea>
//                 <button  onClick={ this.onSave.bind(this) }>Save</button>
//             </div>
//         )
//     }
// }