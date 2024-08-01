import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/scss/index.scss'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { fetchUserProfile } from './features/authSlice'
import Login from './components/Login'
import UserProfile from './components/UserProfile'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import HomePage from './components/pages/HomePage'
import NotFound from './components/pages/NotFound.jsx'

// Fetch user profile if token exists
if (localStorage.getItem('token')) {
    store.dispatch(fetchUserProfile())
}

ReactDOM.createRoot(document.getElementById('root')).render(
        <Provider store={store}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user/login" element={<Login/>} />
                    <Route path="/user/profile" element={<UserProfile />} />
                    <Route path="/*" element={<NotFound />} /> {/* Cette route capture toutes les autres URL non listées */}
                </Routes>
                <Footer />
            </Router>
        </Provider>
)
