import React, { useState, useEffect } from "react";
import {
	Actionsheet,
	IconButton,
	Button,
	HStack,
	Heading,
	useDisclose,
	Text,
	Box,
	Input,
	useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useOrderTicketMutation } from "../../../features/Events/eventApi";

export default function OrderAction({
	ticketId,
	title,
	setTicketId,
	eventId,
	data,
}) {
	const [
		orderTicket,
		{ isLoading, isSuccess, isError, data: response },
	] = useOrderTicketMutation();
	const { isOpen, onOpen, onClose } = useDisclose();
	const toast = useToast();
	const [password, setPassword] = useState("");
	const [nombre, setNombre] = useState(1);
	const selectTicket = data?.find((ticket) => ticket.id === ticketId);

	useEffect(() => {
		if (isSuccess && response) {
			toast.show({
				render: () => {
					return (
						<Box bg='emerald.500' px='2' py='1' rounded='sm' mb={5}>
							{response.success}
						</Box>
					);
				},
			});
			onClose()
		}
	}, [isSuccess, response]);

	const increment = () => {
		if (nombre < Number(selectTicket?.restant)) {
			setNombre(nombre + 1);
		}
	};

	const decrement = () => {
		if (nombre > 0) setNombre(nombre - 1);
	};

	const validateOrder = async () => {
		const data = {
			nombre: nombre.toString(),
			ticketId: ticketId,
			coupon: null,
			password: password.toString(),
		};
		try {
			const paylaod = await orderTicket({ id: eventId, ...data }).unwrap();
			console.log("the payload : ", paylaod);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Button mx={'5'} size={"lg"} mt={'0'} mb={'5'} onPress={onOpen}>
				Commander ce ticket
			</Button>
			<Actionsheet isOpen={isOpen} onClose={onClose}>
				<Actionsheet.Content>
					<Box w='100%' py='5' px={4} justifyContent='center'>
						<Text fontSize='lg'>{title}</Text>
						<Heading my={"2"} fontSize={"md"}>
							{" "}
							{selectTicket?.reference}
						</Heading>
					</Box>
					<HStack justifyContent='space-between' alignItems={"center"}>
						<IconButton
							size='md'
							variant='solid'
							rounded={"full"}
							mx='12'
							onPress={() => decrement()}
							_icon={{
								as: Feather,
								name: "minus",
							}}
						/>
						<Text bold fontSize={"lg"}>
							{nombre} tickets
						</Text>

						<IconButton
							size='md'
							variant='solid'
							rounded={"full"}
							mx='12'
							onPress={() => increment()}
							_icon={{
								as: MaterialIcons,
								name: "add",
							}}
						/>
					</HStack>

					<Input
						type='password'
						value={password}
						onChangeText={(val) => setPassword(val)}
						borderWidth={"1"}
						mt={"5"}
						px={"4"}
						variant={"filled"}
						size={"md"}
						p={2}
						placeholder='Entrez votre mot de passe...'
					/>

					<HStack mt={"10"}>
						{/* <Button px={"10"} variant='outline' mr='3'>
							Annuler
						</Button> */}
						<Button isLoading={isLoading} onPress={async () => await validateOrder()} px={"10"}>
							Valider
						</Button>
					</HStack>
				</Actionsheet.Content>
			</Actionsheet>
		</>
	);
}
