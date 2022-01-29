import { api } from "../../app/api";

export const authApi = api.injectEndpoints({
    endpoints:(builder) => ({
        login:builder.mutation({
            invalidatesTags:['auth'],
            query:(body) => ({
                url:'/login',
                method:'POST',
                body
            }),
        }),
        signUp:builder.mutation({
            invalidatesTags:['auth'],
            query:(body) => ({
                url:'/register',
                method:'POST',
                body
            }),
        }),
        validation:builder.mutation({
            invalidatesTags:['auth'],
            query:(body) => ({
                url:'/validation-account',
                method:'POST',
                body
            }),
        }),
        sendCodeAgain:builder.mutation({
            invalidatesTags:['auth'],
            query:(body) => ({
                url:'/send-code-again',
                method:'POST',
                body
            }),
        }),
        logout:builder.mutation({
            invalidatesTags:['auth'],
            query:() => ({
                url:'/logout',
                method:'POST',
            }),
        }),
        resetPassword:builder.mutation({
            invalidatesTags:['auth'],
            query:(body) => ({
                url:'/reset-password',
                method:'POST',
                body
            }),
        }),
        getProfile:builder.query({
            providesTags:['auth'],
            query:(identifiant) => ({
                url:`/profil/${identifiant}`,
                method:'GET',
            }),
        }),
        modifyProfil:builder.mutation({
            invalidatesTags:['auth'],
            query:(body) => ({
                url:'/update-profil',
                method:'PUT',
                body
            }),
        }),
        changePassword:builder.mutation({
            invalidatesTags:['auth'],
            query:(body) => ({
                url:'/change-password',
                method:'PUT',
                body
            }),
        }),
        overrideExisting: true,
    })
})

export const {
    useLoginMutation,
    useSignUpMutation,
    useValidationMutation,
    useSendCodeAgainMutation,
    useLogoutMutation,
    useResetPasswordMutation,
    useGetProfilQuery,
    useModifyProfilMutation,
    useChangePasswordMutation
} = authApi
