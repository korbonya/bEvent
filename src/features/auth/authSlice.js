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
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, async (state, {payload}) => {
            state.isLoggedIn = true;
            state.user = payload;
            await saveUser(payload)
            return state
        })
        .addMatcher(authApi.endpoints.logout.matchFulfilled, async (state) => {
            state.isLoggedIn = false
            state.user = null
            await deleteUser()
            return state
        })
    }
})

export default authSlice.reducer