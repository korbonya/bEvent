import React, { useState, useEffect } from "react";
import {
	Box,
	Text,
	Icon,
	ScrollView,
	VStack,
	HStack,
	Heading,
	Badge,
	Center,
	Skeleton,
	StatusBar,
	IconButton,
	AspectRatio,
	Image,
	Spinner,
} from "native-base";
import ImageCaroussel from "../../common/components/Caroussel/ImageCaroussel";
import { MaterialIcons } from "@expo/vector-icons";
import Tickets from "../../common/components/Lists/Tikets";
import OrderAction from "../../common/components/Modals/OrderAction";
import { useGetEventQuery } from "./eventApi";
import { dformat } from "../../common/utils/dFormat";
import { useOrderTicketMutation } from "./eventApi";

export default function DetailEventScreen({ route, navigation }) {
	const [ticketId, setTicketId] = useState(1);
	const { id } = route.params;
	const { data, isLoading } = useGetEventQuery(id);
	const [tickets, setTickets] = useState([]);
	console.log("levent::", data);

	useEffect(() => {
		if (data) {
			setTickets(data.tickets);
		}
	}, [data]);

	

	return (
		<>
			<ScrollView
				showsVerticalScrollIndicator={false}
				stickyHeaderIndices={[0]}
			>
				<Box>
					<StatusBar backgroundColor='#0825dd' barStyle='light-content' />
					<Box pt='5' safeAreaTop backgroundColor='primary.500' />

					<HStack
						bg='primary.500'
						pb={"2"}
						px='1'
						justifyContent='space-between'
						alignItems='center'
					>
						<IconButton
							onPress={() => navigation.goBack()}
							icon={
								<Icon
									size='sm'
									as={<MaterialIcons name='arrow-back' />}
									color='white'
								/>
							}
						/>
						<Text color='white' fontSize='20' fontWeight='bold'>
							{" "}
							{"Detail de l'évement"}
						</Text>
						{/* <IconButton icon={<Icon as={<MaterialIcons name='favorite' />} size='sm' color="white" />} /> */}
						<IconButton
							icon={
								<Icon
									as={<MaterialIcons name='notifications-none' />}
									size='sm'
									color='primary.500'
								/>
							}
						/>
					</HStack>
				</Box>
				{!isLoading && data ? (
					<Box>
						<AspectRatio width='100%' ratio={16 / 9}>
							<Image
								borderTopRadius={"md"}
								source={{
									uri: `https://bevent-admin.elitegroupe.net/storage/${data?.image}`,
								}}
								alt={data?.titre}
							/>
						</AspectRatio>
						<VStack pb={"5"} px={"5"}>
							<Heading mt={"8"} size='lg' mb='4'>
								<Text mr={"2"}>{data?.titre}</Text>
							</Heading>
							{/* <Heading size={'lg'}>
									<Button variant={'subtle'} rounded={"xl"}  colorScheme='primary'>
									{data?.type}
								</Button>
								</Heading> */}
							<VStack space={"4"} pb={"8"} borderBottomWidth={"1"} my={"5"}>
								<HStack>
									<Box mr={'5'} p={'2'} rounded={'2xl'} bgColor={'primary.50'} justifyContent={'center'} >
									<Icon
										opacity={0.5}
										fontWeight='light'
										color={'primary.400'}
										as={MaterialIcons}
										name='calendar-today'
									/>
									</Box>
									<Box justifyContent={'center'} >
										<Heading fontSize={"lg"} fontWeight={"bold"}>
											{"Du "}
											{dformat(data?.date_debut, "ddd, Do MMM")}
											{" Au "}
											{/* {dformat(data?.date_fin, "ddd, Do MMM YY")}{" "} */}
										</Heading>
										<Text
											color={"gray.500"}
											fontWeight={"bold"}
											fontSize={"md"}
										>
											{dformat(data?.date_fin, "ddd, Do MMM YY")}{" "}
										</Text>
									</Box>
									
								</HStack>
								<HStack>
									<Box mr={'5'} p={'2'} rounded={'2xl'} bgColor={'primary.50'} justifyContent={'center'} >
									<Icon
										opacity={0.5}
										fontWeight='light'
										color={'primary.400'}
										as={MaterialIcons}
										name='category'
									/>
									</Box>
									<Box>
										<Heading fontSize={"lg"} fontWeight={"bold"}>
										{data?.type}	
										</Heading>
										<Text
											color={"gray.500"}
											fontWeight={"bold"}
											fontSize={"md"}
										>
											Catégorie
										</Text>
									</Box>
								</HStack>
								<HStack>
									<Box mr={'5'} p={'2'} rounded={'2xl'} bgColor={'primary.50'} justifyContent={'center'}>
									<Icon
										opacity={0.5}
										fontWeight='light'
										color={'primary.400'}
										as={MaterialIcons}
										name='where-to-vote'
									/>
									</Box>
									<Box>
										<Heading fontSize={"lg"} fontWeight={"bold"}>
										{data?.lieu}
											
										</Heading>
										<Text
											color={"gray.500"}
											fontWeight={"bold"}
											fontSize={"md"}
										>
											 {data?.ville}
										</Text>
									</Box>
								</HStack>
								<HStack>
									<Box mr={'5'} p={'2'} rounded={'2xl'} bgColor={'primary.50'} justifyContent={'center'}>
										<Icon
										opacity={0.5}
										fontWeight='light'
										color={'primary.400'}
										as={MaterialIcons}
										name='person'
									/>
									</Box>
									
									<Box>
										<Heading fontSize={"lg"} fontWeight={"bold"}>
										{data?.organisateur}
										</Heading>
										<Text
											color={"gray.500"}
											fontWeight={"bold"}
											fontSize={"md"}
										>
											Organisateur
										</Text>
									</Box>
								</HStack>
							</VStack>

							<Heading mt={"5"} size='md' mb='4'>
								Tickets
							</Heading>
							<Tickets
								ticketId={ticketId}
								setTicketId={setTicketId}
								data={tickets}
							/>
						</VStack>
					</Box>
				) : (
					<Box flex={1} justifyContent={"center"} alignItems={"center"}>
						<Center><Spinner accessibilityLabel='Chargement' /></Center>
					</Box>
				)}
			</ScrollView>

			{!isLoading && data && (
				<OrderAction
					eventId={data?.id}
					title={data?.titre}
					data={tickets}
					ticketId={ticketId}
					setTicketId={setTicketId}
					navigation={navigation}
				/>
			)}
		</>
	);
}

const Loading = () => {
	return (
		<Box>
			<Center>
				<Heading>Chargemnent...</Heading>
			</Center>
		</Box>
	);
};
