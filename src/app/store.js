import { configureStore} from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from '../features/auth/authSlice'


const reducer = {
    auth:authReducer,
    [api.reducerPath] : api.reducer
}

export const store = configureStore({
    reducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export const rootState = store.getState()