import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const initialState = {
    isLoggedIn : false,
    user: null
}

const authSlice = createSlice({
    name:'userAuth',
    initialState,
    reducers:{
        setStoredUser:(state, {payload}) =>{
            state.isLoggedIn = true
            state.user = payload
            console.log('the state in action ', state)
        }
    },
    extraReducers:(builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, {payload}) => {

           
            state.isLoggedIn = true;
            state.user = payload;
            return state
        })
        .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
            state.isLoggedIn = false
            state.user = null
            return state
        })
    }
})

export const {setStoredUser} = authSlice.actions 
export default authSlice.reducer

