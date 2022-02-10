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
            query:(body) => ({
                url:'/register',
                method:'POST',
                body
            }),
        }),
        validation:builder.mutation({
            query:(body) => ({
                url:'/validation-account',
                method:'POST',
                body
            }),
        }),
        sendCodeAgain:builder.mutation({
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
        getProfil:builder.query({
            providesTags:['auth'],
            query:() => `/profil`
        }),
        // getBalance:builder.query({
        //     providesTags:['auth'],
        //     query:() => `/solde`,
        // }),
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
