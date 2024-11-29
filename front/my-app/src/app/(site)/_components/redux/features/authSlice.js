import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    isLoading: true,
    loginFirstName: '',
    profileImage: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: state => {
            state.isAuthenticated = true
        },
        logout: state => {
            state.isAuthenticated = false

        },
        finishIntialLoad: state => {
            state.isLoading = false
        },
        setloginFirstName: (state, action) => {
            state.loginFirstName = action.payload
        },
        setprofileImage: (state, action) => {
            state.profileImage = action.payload
        }

    }
})

export const {setAuth, logout, finishIntialLoad, setloginFirstName, setprofileImage}  = authSlice.actions;
export default authSlice.reducer;