import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/scss/index.scss'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Login from './components/Login'
import SignUp from './components/SignUp.jsx'
import UserProfile from './components/UserProfile'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import HomePage from './components/pages/HomePage'

ReactDOM.createRoot(document.getElementById('root')).render(
        <Provider store={store}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user/signup" element={<SignUp />} />
                    <Route path="/user/login" element={<Login/>} />
                    <Route path="/user/profile" element={<UserProfile />} />
                    {/*<Route path="/404" element={} />*/}
                </Routes>
                <Footer />
            </Router>
        </Provider>
)
