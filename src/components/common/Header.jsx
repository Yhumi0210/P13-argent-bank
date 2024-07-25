import bankLogo from '../../assets/img/argentBankLogo.png'
import '../../assets/scss/index.scss'
import {Link, useNavigate} from 'react-router-dom'
import {fetchUserProfile, logout} from '../../features/authSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'

function Header() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token, user } = useSelector((state) => state.auth)
    const [firstName, setFirstName] = useState('')

    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile())
        }
    }, [token, dispatch])

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName)
        }
    }, [user])

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }



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
                    {token ? (
                        <>
                            <Link className="main-nav-item" to='/user/profile'>
                                <i className="fa fa-user-circle icon"></i>
                                {firstName}
                            </Link>
                            <button className="button" onClick={handleLogout}>
                                <i className="fa fa-sign-out icon"></i>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link className="main-nav-item" to='/user/login'>
                            <i className="fa fa-user-circle icon"></i>
                            Sign in
                        </Link>
                    )}
                    {/*<Link className="main-nav-item" to='/user/signup'>*/}
                    {/*    <i className="fa-solid fa-user-plus"></i>*/}
                    {/*    Sign Up*/}
                    {/*</Link>*/}
                </div>
            </nav>
        </>
    )
}

export default Header
