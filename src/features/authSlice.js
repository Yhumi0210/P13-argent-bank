import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
}

const url = import.meta.env.VITE_API_BASE_URL

// Async thunk for signup
export const signup = createAsyncThunk('auth/signup', async (credentials) => {
    const response = await fetch(`${url}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })

    if (!response.ok) {
        throw new Error('SignUp failed')
    }

    const data = await response.json()
    return data
})

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await fetch(`${url}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })

    if (!response.ok) {
        throw new Error('Login failed')
    }

    const data = await response.json()
    localStorage.setItem('token', data.body.token)
    return data.body
})

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, { getState }) => {
    const token = getState().auth.token
    const response = await fetch(`${url}/user/profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Fetching user profile failed')
    }

    const data = await response.json()
    return data.body
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.status = 'idle'
            state.error = null
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload.token
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(signup.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload.token
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload
            })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
