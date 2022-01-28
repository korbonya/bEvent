import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView, Heading, Box } from 'native-base'
import AppBar from '../../common/components/headers/AppBar'
import ListTopEvents from '../../common/components/Lists/ListTopEvents'
import EventCard from '../../common/components/Cards/EventCard'
import AutherEvents from '../../common/components/Lists/AutherEvents'
import {useGetEventsQuery, useGetEventQuery, useGetCategoriesQuery} from '../Events/eventApi'

export default function HomeScreen({navigation}) {
    const {data:categories} = useGetCategoriesQuery()
    const {data, isLoading} = useGetEventsQuery()

    return (
        <Box bgColor='coolGray.100'>
            {/* <AppBar /> */}
            <ScrollView 
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                _contentContainerStyle={{
                mb: "12",
                minW: "72",
                }}
            >
            <AppBar />
            <ListTopEvents data={data} navigation={navigation} />
            <Heading fontSize='xl' p='4' pb='3'>
				Top des Évenements
			</Heading>
            {!isLoading && data && <EventCard data={data[1]} navigation={navigation}/>}
            <Heading fontSize='xl' p='4' pb='1'>
				Autres Évenement
			</Heading>
            <AutherEvents navigation={navigation} data={data} />
            </ScrollView>
        </Box>
    )
}
