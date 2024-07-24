import bankLogo from '../../assets/img/argentBankLogo.png'
import '../../assets/scss/index.scss'
import {Link} from 'react-router-dom'

function Header() {

    return (
        <>
            <nav className="main-nav">
                <Link className="main-nav-logo" to='/'>
                    <img
                        className="main-nav-logo-image"
                        src={bankLogo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>

                    <Link className="main-nav-item" to='/user/signup'>
                        <i className="fa-solid fa-user-plus"></i>
                        Sign In
                    </Link>
                    <Link className="main-nav-item" to='/user/login'>
                        <i className="fa fa-user-circle"></i>
                        Log in
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Header
