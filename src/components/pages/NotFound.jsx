import { NavLink } from "react-router-dom"

function NotFound() {
    return (
        <div className="error bg-dark">
            <h1 className="error__title">404</h1>
            <p className="error__text">This page does not exist !</p>
            <NavLink to="/" className="error__link">
                Come back to home
            </NavLink>
        </div>
    )
}

export default NotFound
