import React, {useEffect, useCallback} from "react";
import {
	ScrollView,
	Skeleton,
	Center,
	VStack,
	Heading,
	Box,
	HStack,
    Input,
    Icon,
    Button,
} from "native-base";
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from "react-native";
import AppBar from "../../common/components/headers/AppBar";
import ListTopEvents from "../../common/components/Lists/ListTopEvents";
import EventCard from "../../common/components/Cards/EventCard";
import AutherEvents from "../../common/components/Lists/AutherEvents";
import {
	useGetEventsQuery,
	useGetEventQuery,
	useGetCategoriesQuery,
} from "../Events/eventApi";
import {MaterialIcons} from '@expo/vector-icons' 
import { getUser } from "../../common/utils/secureStore";
import { useLoginMutation } from "../auth/authApi";
import { setStoredUser } from "../auth/authSlice";
import { useDispatch } from "react-redux";

export default function HomeScreen({ navigation }) {
	const dispatch = useDispatch()
	const { data: categories } = useGetCategoriesQuery();
	const { data, isLoading, error } = useGetEventsQuery();
	console.log("error :", error);

	const [login, {isLoading:loadLogin}] = useLoginMutation()

	const getUserProfile = useCallback(async ()=>{
	  try {
		const user = await getUser()
		const userParsed = JSON.parse(user)
		if(userParsed){
		  dispatch(setStoredUser(userParsed))
		  console.log('la user stokee est ', userParsed)
		}else{
			console.log('there no data stored ', user)
		}
	  } catch (error) {
		console.log(error)
	  }
	},[])
  
	useEffect(()=> {
	  getUserProfile()
	},[getUserProfile])
  
	return (

		<Box safeArea bgColor='gray.100'>
			{/* <AppBar /> */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				// stickyHeaderIndices={[0]}
				_contentContainerStyle={{
					mb: "12",
					minW: "72",
				}}
                px='2'
			>
				{/* <AppBar /> */}
                <VStack mx={'2'}  bg={'gray.100'} my={'5'} w="100%" space={5} alignSelf="center">
                    <Input placeholder="Trouver un évenement" width="100%" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />}  />
                </VStack>
                <HStack mx={'2'}>
					{categories?.map((item, index) => (
						<Button key={index} variant={'subtle'} size={'lg'} rounded={'lg'} colorScheme='primary'>{item}</Button>
					))}
				</HStack>
				<ListTopEvents data={data} navigation={navigation} />
				 <Heading fontSize='xl' p='4' pb='3'>
					Évenement à la une
				</Heading>
				{!isLoading && data ? (
					<EventCard data={data[1]} navigation={navigation} />
				) : (
					<LoadEventH />
				)}
				<Heading fontSize='xl' p='4' pb='1'>
					Autres Évenement
				</Heading>
				
				<AutherEvents navigation={navigation} data={data} />
			</ScrollView>
		</Box>
	);
}

const LoadEventH = () => {
	return (
		<Center w='100%'>
			<HStack
				w='90%'
				maxW='400'
				borderWidth='1'
				space={8}
				rounded='md'
				_dark={{
					borderColor: "coolGray.500",
				}}
				_light={{
					borderColor: "coolGray.200",
				}}
				p='4'
			>
				<Skeleton flex='1' h='150' rounded='md' startColor='coolGray.100' />
				<VStack flex='3' space='4'>
					<Skeleton startColor='amber.300' />
					<Skeleton.Text />
					<HStack space='2' alignItems='center'>
						<Skeleton size='5' rounded='full' />
						<Skeleton h='3' flex='2' rounded='full' />
						<Skeleton h='3' flex='1' rounded='full' startColor='indigo.300' />
					</HStack>
				</VStack>
			</HStack>
		</Center>
	);
};

const LoadEvent = () => {
	return (
		<Center w='100%'>
			<HStack
				w='90%'
				maxW='400'
				borderWidth='1'
				space={8}
				rounded='md'
				_dark={{
					borderColor: "coolGray.500",
				}}
				_light={{
					borderColor: "coolGray.200",
				}}
				p='4'
			>
				<Skeleton flex='1' h='150' rounded='md' startColor='coolGray.100' />
				<VStack flex='3' space='4'>
					<Skeleton startColor='amber.300' />
					<Skeleton.Text />
					<HStack space='2' alignItems='center'>
						<Skeleton size='5' rounded='full' />
						<Skeleton h='3' flex='2' rounded='full' />
						<Skeleton h='3' flex='1' rounded='full' startColor='indigo.300' />
					</HStack>
				</VStack>
			</HStack>
		</Center>
	);
};

const LoadEventV = () => {
	return (
		<Center w='100%'>
			<HStack
				w='90%'
				maxW='400'
				borderWidth='1'
				space={8}
				rounded='md'
				_dark={{
					borderColor: "coolGray.500",
				}}
				_light={{
					borderColor: "coolGray.200",
				}}
				p='4'
			>
				<Skeleton flex='1' h='150' rounded='md' startColor='coolGray.100' />
				<VStack flex='3' space='4'>
					<Skeleton startColor='amber.300' />
					<Skeleton.Text />
					<HStack space='2' alignItems='center'>
						<Skeleton size='5' rounded='full' />
						<Skeleton h='3' flex='2' rounded='full' />
						<Skeleton h='3' flex='1' rounded='full' startColor='indigo.300' />
					</HStack>
				</VStack>
			</HStack>
		</Center>
	);
};
