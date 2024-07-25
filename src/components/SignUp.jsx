import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { status, error, token } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signup({ email, password }))
    }

    useEffect(() => {
        if (token) {
            navigate('/user/profile')
        }
    }, [token, navigate])

    return (
        <>
            <main className="main bg-dark flexcenter">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign Up</h1>
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
                        <button className="sign-in-button" type="submit">Sign Up</button>
                    </form>
                </section>
            </main>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </>
    )
}

export default SignUp
