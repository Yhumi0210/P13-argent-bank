import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, logout } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../service/updateProfile'

const UserProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token, user } = useSelector((state) => state.auth)
    const [editMode, setEditMode] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile())
        }
    }, [token, dispatch])

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName)
            setLastName(user.lastName)
        }
    }, [user])

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleUpdate = async () => {
        await updateProfile({ firstName, lastName }, token)
        dispatch(fetchUserProfile())
        setEditMode(false)
    }

    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <>
            <main className="main bg-dark user">
                <div className="header">
                    <h1>Welcome back<br/>{user.firstName} {user.lastName} !</h1>
                    <button className="edit-button" onClick={() => setEditMode(true)}>Edit Name</button>
                    <button className="edit-button" onClick={handleLogout}>Logout</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                {editMode && (
                    <div>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <button onClick={handleUpdate}>Save</button>
                    </div>
                )}
            </main>
        </>
    )
}

export default UserProfile
