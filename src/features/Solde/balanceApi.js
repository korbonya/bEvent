import {api} from '../../app/api'

const balanceApi = api.injectEndpoints({
    endpoints: (build) => ({
        getBalance: build.query({
            query:()=> '/solde',
            providesTags:['balance']
        }),
        provideBalance:build.mutation({
            invalidatesTags:['balance'],
            query:(body) => ({
                url:'/recharges/orangemoney',
                method:'POST',
                body
            }),
        }),
    }),
    overrideExisting:true
})

export const {useGetBalanceQuery, useProvideBalanceMutation} = balanceApi 