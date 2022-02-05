import {api} from '../../app/api'

const eventApi = api.injectEndpoints({
    endpoints: (build) => ({
        getEvents: build.query({
            query:()=> '/evenements',
            providesTags:(result, error, arg) => 
            result?[...result.map(({id}) => ({type:'event', id})), 'event']:['event'],
        }),
        getCategories: build.query({
            query:()=> '/categories',
            providesTags:['categories']
        }),
        getEvent:build.query({
            providesTags:(result, error, id) => [{ type: 'event', id }],
            query:(id) => `/evenements/${id}`
        }),
        orderTicket:build.mutation({
            invalidatesTags:['tiket'],
            query:({id, ...body}) => ({
                url:`/evenements/${id}/reservation`,
                method:'POST',
                body
            }),
            // query:(eventId, data) => ({
            //     url:`/evenements/${eventId}/reservation`,
            //     method:"POST",
            //     body:data
            // })
        })
    }),
    overrideExisting:true
})

export const {useGetEventsQuery, useGetEventQuery, useGetCategoriesQuery, useOrderTicketMutation} = eventApi 