import React from "react"
import Button from "../components/Button/Button"

export default function Footer(props) {
    const mail = "missoma97@gmail.com"

    return (
        <div className="footer">
            <footer>
                <p>
                    <Button mailto={ mail } value={ `Contact : ${mail}`}/><br/>
                    &copy; 2021 - Tous droits réservés
                </p>
            </footer>
        </div>
    )
}