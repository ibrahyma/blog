import './style/Button.css'
import { BASE_CLIENT_URL } from "../services/api_service";

export default function Button(props) {
    const { onClick, href, mailto, className } = props

    return (
        <button className={`button ${className}`}
            onClick={ () => {
                if (onClick) {
                    onClick()
                }

                if (mailto) {
                    window.open(`mailto:${mailto}`)
                    return
                }

                if (href) {
                    if (window.location.href.replace(BASE_CLIENT_URL, "") !== href) {
                        window.location = props.href
                    }
                }
            }}>{ props.value }</button>
    )
}