import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        token: null,
        refreshToken: null,
        account: null,
        cart: null,
    },
    reducers: {
        login: (state,action) => {
            state.token = action.payload.token
            state.refreshToken = action.payload.refreshToken
            state.account = action.payload.account
        },
        logout: (state) => {
            state.token = null
            state.refreshToken = null
            state.account = null
            state.cart = null
        },
        assignCart: (state, action) => {
            state.cart = action.payload.cart
        },
    }
})

export const { login, logout, assignCart } = authSlice.actions
export default authSlice.reducer