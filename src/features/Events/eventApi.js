import {api} from '../../app/api'

const eventApi = api.injectEndpoints({
    endpoints: (build) => ({
        getEvents: build.query({
            providesTags:['event'],
            query:()=> '/evenements'
        }),
        getCategories: build.query({
            providesTags:['event'],
            query:()=> '/categories'
        }),
        getEvent:build.query({
            providesTags:['event'],
            query:(id) => `/evenements/${id}`
        })
    }),
    overrideExisting:true
})

export const {useGetEventsQuery, useGetEventQuery, useGetCategoriesQuery} = eventApi 