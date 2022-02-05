import { api } from "../../app/api"

const ticketApi = api.injectEndpoints({
    endpoints:(build) => ({
        getTickets: build.query({
            query:()=> '/mes-tickets',
            providesTags:['tiket']
        })
    }),
    overrideExisting:true
})

export const {useGetTicketsQuery} = ticketApi