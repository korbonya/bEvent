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
	Skeleton
} from "native-base";
import ImageCaroussel from "../../common/components/Caroussel/ImageCaroussel";
import { MaterialIcons } from "@expo/vector-icons";
import Tickets from "../../common/components/Lists/Tikets";
import OrderAction from "../../common/components/Modals/OrderAction";
import { useGetEventQuery } from "./eventApi";
import { dformat } from "../../common/utils/dFormat";
import { useOrderTicketMutation } from "./eventApi";

export default function DetailEventScreen({ route }) {
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
		<ScrollView>
			{!isLoading && data ? (
				<Box>
					<ImageCaroussel image={data?.image} />
					<VStack px={"3"}>
						<Heading mt={"8"} size='md' mb='4'>
							<Text mr={"2"}>{data?.titre}</Text>
							<Badge px={"2"} rounded={"xl"} mx={"2"} colorScheme='success'>
								<Text>{data?.type}</Text>
							</Badge>
						</Heading>

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
									<Heading fontSize={"lg"} fontWeight={"normal"}>
										{" "}
										{dformat(data?.date_debut, "ll")} au{" "}
									</Heading>
									<Text fontSize={"md"}>{data?.heure_debut}</Text>
								</Box>
								<Box>
									<Heading fontSize={"lg"} fontWeight={"normal"}>
										{" "}
										{dformat(data?.date_fin, "ll")}{" "}
									</Heading>
									<Text fontSize={"md"}>{data?.heure_fin}</Text>
								</Box>
							</HStack>
							<HStack>
								<Icon
									opacity={0.5}
									fontWeight='light'
									mr={"5"}
									as={MaterialIcons}
									name='map'
								/>
								<Box>
									<Heading fontSize={"lg"} fontWeight={"normal"}>
										{data?.lieu}
									</Heading>
									<Text fontSize={"md"}>{data?.ville}</Text>
								</Box>
							</HStack>
							<HStack>
								<Icon
									opacity={0.5}
									fontWeight='light'
									mr={"5"}
									as={MaterialIcons}
									name='attach-money'
								/>
								<Box>
									<Heading fontSize={"lg"} fontWeight={"normal"}>
										{data?.organisateur}
									</Heading>
									{/* <Text fontSize={'md'}>17h:00 GMT</Text> */}
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
						<OrderAction
							eventId={data?.id}
							title={data?.titre}
							data={tickets}
							ticketId={ticketId}
							setTicketId={setTicketId}
						/>
					</VStack>
				</Box>
			) : (
				<Loading />
			)}
		</ScrollView>
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
