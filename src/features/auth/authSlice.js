import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { saveUser, deleteUser } from "../../common/utils/secureStore";

const initialState = {
    isLoggedIn : false,
    user: null
}

const authSlice = createSlice({
    name:'userAuth',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled,  (state, {payload}) => {
            state.isLoggedIn = true;
            state.user = payload;
            console.log('the payload',payload)
            console.log('the state in login slice:: ', state)
            return state
        })
        .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
            state.isLoggedIn = false
            state.user = null
            return state
        })
    }
})

export default authSlice.reducer