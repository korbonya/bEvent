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
	Spinner
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
					<StatusBar backgroundColor='#0967D2' barStyle='light-content' />
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
						<VStack pb={'5'} px={"5"}>
							<Heading mt={"8"} size='md' mb='4'>
								<Text mr={"2"}>{data?.titre}</Text>
							</Heading>
								{/* <Heading size={'lg'}>
									<Button variant={'subtle'} rounded={"xl"}  colorScheme='primary'>
									{data?.type}
								</Button>
								</Heading> */}
							<VStack space={"4"} pb={"8"} borderBottomWidth={"1"} my={"5"}>
								<HStack>
									<Icon
										opacity={0.5}
										fontWeight='light'
										mr={"5"}
										as={MaterialIcons}
										name='calendar-today'
									/>
									<Box>
										<Heading fontSize={"lg"} fontWeight={"bold"}>
											{" "}
											{dformat(data?.date_debut, "ddd, Do MMM")}{" - "}
											{dformat(data?.date_fin, "ddd, Do MMM YY")}{" "}
										</Heading>
										<Text color={'gray.500'} fontWeight={'bold'} fontSize={"md"}>{data?.heure_debut}
										{" - "}{data?.heure_fin}
										</Text>
									</Box>
									{/* <Box>
										<Heading fontSize={"lg"} fontWeight={"normal"}>
											{" "}
											
										</Heading>
										<Text fontSize={"md"}>{data?.heure_fin}</Text>
									</Box> */}
								</HStack>
								<HStack>
									<Icon
										opacity={0.5}
										fontWeight='light'
										mr={"5"}
										as={MaterialIcons}
										name='category'
									/>
									<Box>
										<Heading fontSize={"lg"} fontWeight={"bold"}>
											Type
										</Heading>
										<Text color={'gray.500'} fontWeight={'bold'} fontSize={"md"}>{data?.type}</Text>
									</Box>
								</HStack>
								<HStack>
									<Icon
										opacity={0.5}
										fontWeight='light'
										mr={"5"}
										as={MaterialIcons}
										name='where-to-vote'
									/>
									<Box>
										<Heading fontSize={"lg"} fontWeight={"bold"}>
											Ville:{" "}{data?.ville} 
										</Heading>
										<Text color={'gray.500'} fontWeight={'bold'} fontSize={"md"}>Lieu: {''} {data?.lieu}</Text>
									</Box>
								</HStack>
								<HStack>
									<Icon
										opacity={0.5}
										fontWeight='light'
										mr={"5"}
										as={MaterialIcons}
										name='person'
									/>
									<Box>
										<Heading fontSize={"lg"} fontWeight={"bold"}>
											Organisateur
										</Heading>
										<Text color={'gray.500'} fontWeight={'bold'} fontSize={'md'}>{data?.organisateur}</Text>
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
					<Box flex={1} justifyContent={'center'} alignItems={'center'} >
    <Spinner accessibilityLabel="Chargement" />
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
