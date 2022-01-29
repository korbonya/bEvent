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
            providesTags:(result, error, arg) => 
            result?[...result.map(({id}) => ({type:'event', id})), 'event']:['event'],
        }),
        getEvent:build.query({
            providesTags:['event'],
            query:(id) => `/evenements/${id}`
        })
    }),
    overrideExisting:true
})

export const {useGetEventsQuery, useGetEventQuery, useGetCategoriesQuery} = eventApi 