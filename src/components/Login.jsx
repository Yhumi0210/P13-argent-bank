import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { token, status, error } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({ email, password }))
    }

    useEffect(() => {
        if (token) {
            console.log('JWT Token:', token)
            navigate('/user/profile')
        }
    }, [token, navigate])

    return (
        <>
            <main className="main bg-dark flexcenter">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Log In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required/>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required/>
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me"/>
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button" type="submit">Log In</button>
                    </form>
                </section>
            </main>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </>
    )
}

export default Login
