import React, { useState, useCallback, useEffect } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";

import {
	Box,
	Text,
	Pressable,
	Heading,
	ScrollView,
	Icon,
	HStack,
	Center,
	VStack,
	Spacer,
  Skeleton
} from "native-base";
import { RefreshControl } from "react-native";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import AppBar2 from "../../common/components/headers/AppBar2";
import { useGetTicketsQuery } from "./ticketApi";
import { deleteUser } from "../../common/utils/secureStore";

export default function TicketsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false)
	const data = [
		{
			id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
			fullName: "Afreen Khan",
			timeStamp: "12:47 PM",
			recentText: "Good Day!",
			avatarUrl:
				"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		},
		{
			id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
			fullName: "Sujita Mathur",
			timeStamp: "11:11 PM",
			recentText: "Cheer up, there!",
			avatarUrl:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			fullName: "Anci Barroco",
			timeStamp: "6:22 PM",
			recentText: "Good Day!",
			avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
		},
		{
			id: "68694a0f-3da1-431f-bd56-142371e29d72",
			fullName: "Aniket Kumar",
			timeStamp: "8:56 PM",
			recentText: "All the best",
			avatarUrl:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
		},
		{
			id: "28694a0f-3da1-471f-bd96-142456e29d72",
			fullName: "Kiara",
			timeStamp: "12:47 PM",
			recentText: "I will call today.",
			avatarUrl:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
		},
	];
	const { data: tickets, refetch, isLoading, isSuccess, error } = useGetTicketsQuery();
	const [listData, setListData] = useState(data);
	
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  },[])

	const closeRow = (rowMap, rowKey) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	};

	console.log("tikets", tickets);



	return (
		<>
			<AppBar2 title='Mes Tickets' />
			{isLoading ? (
        <LoadEventV />
			) : tickets && tickets.length === 0 ? (
				<Box flex={1} justifyContent={"center"} alignItems={"center"}>
					<Text fontSize={"lg"}>Aucun Ticket acheté</Text>
				</Box>
			) : (
				tickets && (
					<Box px='2' bg='white' safeArea flex='1'>
						<ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>
            }  

            >
							{tickets?.map((item, index) => (
								<Box
									key={index}
									shadow={"0"}
									bgColor={"coolGray.50"}
									my='2'
									borderRadius='lg'
								>
									<Pressable
										onPress={() =>
											navigation.push("DetailTicket", { data: item })
										}
									>
										<Box pl='4' pr='5' py='2'>
											<HStack pr={"2"} space={3}>
												{/* <Avatar size="48px" source={{ uri: item.avatarUrl }} /> */}
												<VStack>
													<Text
														color='coolGray.800'
														_dark={{ color: "warmGray.50" }}
														bold
													>
														{item?.type}
													</Text>
													<Text
														color='primary.700'
														bold
														fontSize='lg'
														_dark={{ color: "warmGray.200" }}
													>
														{item.evenement}
													</Text>
													<Text mt={"4"}>Date:</Text>
													<Text bold>{item.date}</Text>
												</VStack>
												<Spacer />
												<VStack>
													<Text
														fontSize='xs'
														color='coolGray.800'
														_dark={{ color: "warmGray.50" }}
														alignSelf='flex-start'
													>
														Prix
													</Text>
													<Text bold fontSize={"md"}>
														{item?.montant + " GNF"}
													</Text>
													{/* <Button variant={'outline'} mt={'4'}>Carte</Button> */}
												</VStack>
											</HStack>
										</Box>
									</Pressable>
								</Box>
							))}
						</ScrollView>
					
					</Box>
				)
			)}
		</>
	);
}


const LoadEventV = () => {
	return (
		<Center w='100%'>
			
				<VStack  space='4'>
					<Skeleton startColor='gray.200' />
					<Skeleton.Text />
					<HStack space='2' alignItems='center'>
						<Skeleton size='5' rounded='full' />
						<Skeleton h='3' flex='2' rounded='full' />
						<Skeleton h='3' flex='1' rounded='full' startColor='coulGray.300' />
					</HStack>
				</VStack>

        <VStack  space='4'>
					<Skeleton startColor='gray.200' />
					<Skeleton.Text />
					<HStack space='2' alignItems='center'>
						<Skeleton size='5' rounded='full' />
						<Skeleton h='3' flex='2' rounded='full' />
						<Skeleton h='3' flex='1' rounded='full' startColor='coulGray.300' />
					</HStack>
				</VStack>

        <VStack  space='4'>
					<Skeleton startColor='gray.200' />
					<Skeleton.Text />
					<HStack space='2' alignItems='center'>
						<Skeleton size='5' rounded='full' />
						<Skeleton h='3' flex='2' rounded='full' />
						<Skeleton h='3' flex='1' rounded='full' startColor='coulGray.300' />
					</HStack>
				</VStack>

        <VStack  space='4'>
					<Skeleton startColor='gray.200' />
					<Skeleton.Text />
					<HStack space='2' alignItems='center'>
						<Skeleton size='5' rounded='full' />
						<Skeleton h='3' flex='2' rounded='full' />
						<Skeleton h='3' flex='1' rounded='full' startColor='coulGray.300' />
					</HStack>
				</VStack>


		</Center>
	);
};