import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    isLoading: true,
    loginFirstName: '',
    profileImage: '',
    is_staff:false,
    is_superuser:false,
    groups:[],
    permissions:[]
}

const authSlice = createSlice({
    name: 'staff_auth',
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
        },
        setIsStaff: (state, action) => {
            state.is_staff = action.payload
        },
        setIsSupserUser: (state, action) => {
            state.is_superuser = action.payload
        },
        setGroups: (state, action) => {
            state.groups = action.payload
        },
        setPermissions : (state, action) => {
            state.permissions = action.payload
        }
    }
})

export const {setAuth, logout, finishIntialLoad,
     setloginFirstName, setprofileImage, setIsStaff,
     setIsSupserUser, setGroups, setPermissions}  = authSlice.actions;
export default authSlice.reducer;