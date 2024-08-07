import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
}

const url = import.meta.env.VITE_API_BASE_URL

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await fetch(`${url}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })

        const data = await response.json()

        if (!response.ok) {
            return rejectWithValue(data.message)
        }

        localStorage.setItem('token', data.body.token)
        return data.body
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

// Async thunk for fetching user profile
export const fetchUserProfile =
    createAsyncThunk('auth/fetchUserProfile', async (_,
    { getState, rejectWithValue }) => {
    const token = getState().auth.token
    try {
        const response = await fetch(`${url}/user/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            return rejectWithValue(data.message)
        }

        return data.body
    } catch (error) {
        return rejectWithValue(error.message)
    }
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
        const setLoading = (state) => {
            state.status = 'loading'
            state.error = null
        }

        const setSucceeded = (state, action) => {
            state.status = 'succeeded'
            state.token = action.payload.token
            state.error = null
        }

        const setFailed = (state, action) => {
            state.status = 'failed'
            state.error = action.payload || action.error.message
        }

        builder
            .addCase(login.pending, setLoading)
            .addCase(login.fulfilled, setSucceeded)
            .addCase(login.rejected, setFailed)
            .addCase(fetchUserProfile.pending, setLoading)
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload
                state.error = null
            })
            .addCase(fetchUserProfile.rejected, setFailed)
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
