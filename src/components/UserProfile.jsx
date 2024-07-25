import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../features/authSlice'
import { updateProfile } from '../service/updateProfile'

const UserProfile = () => {
    const dispatch = useDispatch()
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

    const handleUpdate = async () => {
        await updateProfile({ firstName, lastName }, token)
        dispatch(fetchUserProfile())
        setEditMode(false)
    }

    const handleCloseUpdate = async() => {
        setEditMode(false)
    }

    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <>
        <main className="main bg-dark user">
            <div className="header">
                <h1>Welcome back</h1>
                {!editMode && (
                    <h1>{user.firstName} {user.lastName} !</h1>
                )}
                {editMode && (
                    <div>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={handleCloseUpdate}>Cancel</button>
                    </div>
                )}
                <button className="edit-button" onClick={() => setEditMode(true)}>Edit Name</button>
            </div>
            {/*<button className="edit-button" onClick={handleLogout}>Sign Out</button>*/}
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

        </main>
</>
)
}

export default UserProfile
