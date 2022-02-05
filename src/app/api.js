import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { getUser } from '../common/utils/secureStore'

export const api = createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:'https://eventapp.elitegroupe.net/api/clients',
        prepareHeaders: async (headers) => {
            const user = JSON.parse(await getUser())
            const hasUser = user && user?.access_token
            
            if (hasUser) headers.set('Authorization', `Bearer ${user?.access_token}`)

             headers.set('Content-Type', 'application/json')
             headers.set('Accept', 'application/json')
            return headers
        }
    }),
    endpoints:() => ({}),
    reducerPath:'api',
    tagTypes:['event','categories', 'auth', 'balance', 'tiket'] 
})