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
	Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useOrderTicketMutation } from "../../../features/Events/eventApi";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

export default function OrderAction({
	navigation,
	ticketId,
	title,
	setTicketId,
	eventId,
	data,
}) {
	const { isLoggedIn } = useSelector((state) => state.auth);
	const [
		orderTicket,
		{ isLoading, isSuccess, isError, error, data: response },
	] = useOrderTicketMutation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			password: "",
		},
	});
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
			onClose();
		}
	}, [isSuccess, response]);

	useEffect(async () => {
		if (error && error.status == 401) {
			await deleteUser();
			navigation.navigate("Login");
		}
	}, [error]);

	const increment = () => {
		if (nombre < Number(selectTicket?.restant)) {
			setNombre(nombre + 1);
		}
	};

	const decrement = () => {
		if (nombre > 0) setNombre(nombre - 1);
	};

	const validateOrder = async (data) => {
		const submitData = {
			nombre: nombre.toString(),
			ticketId: ticketId,
			coupon: null,
			password: data.password,
		};
		try {
			const paylaod = await orderTicket({
				id: eventId,
				...submitData,
			}).unwrap();
			console.log("response : ", paylaod);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Button
				endIcon={
					<Box ml={'4'} bgColor={'primary.400'} p={'1'} rounded={'full'} >
						<Icon color={'white'} as={MaterialIcons} name='shopping-cart' size='sm' />
					</Box>
				}
				mx={"10"}
				size={"lg"}
				_text={{
					fontSize:'xl'
				}}
				rounded={'xl'}
				mt={"0"}
				mb={"5"}
				onPress={onOpen}
			>
				Acheter ce ticket
			</Button>
			<Actionsheet isOpen={isOpen} onClose={onClose}>
				<Actionsheet.Content>
					{isLoggedIn ? (
						<>
							<Box w='100%' py='5' px={4} justifyContent='center'>
								<Text fontSize='lg'>{title}</Text>
								<Heading my={"2"} fontSize={"md"}>
									{" "}
									Ticket: {selectTicket?.reference}, {selectTicket?.prix} GNF
								</Heading>
							</Box>
							<HStack justifyContent='space-between' alignItems={"center"}>
								<IconButton
									size='md'
									variant='solid'
									rounded={"full"}
									disabled={nombre < 1}
									bgColor={nombre < 1 ? "primary.50" : "primary.500"}
									mx='5'
									onPress={() => decrement()}
									_icon={{
										as: Feather,
										name: "minus",
									}}
								/>
								<Text bold fontSize={"lg"}>
									{nombre} ticket{nombre > 1 && "s"}
								</Text>

								<IconButton
									size='md'
									variant='solid'
									bgColor={
										nombre >= selectTicket?.restant
											? "primary.50"
											: "primary.500"
									}
									rounded={"full"}
									mx='5'
									onPress={() => increment()}
									_icon={{
										as: MaterialIcons,
										name: "add",
									}}
								/>
							</HStack>

							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										type='password'
										value={value}
										onChangeText={onChange}
										borderWidth={"1"}
										bgColor={"coolGray.100"}
										mt={"5"}
										px={"4"}
										variant={"outline"}
										size={"md"}
										p={2}
										placeholder='Entrez votre mot de passe...'
									/>
								)}
								name='password'
							/>
							{errors.password && (
								<Text color={"red.300"}> le mot de passe est obligatoire.</Text>
							)}
							{error?.status == 500 && (
								<Text color={"red.300"}>{error?.data?.error}</Text>
							)}

							<HStack mt={"10"}>
								<Button
									px='5'
									isLoading={isLoading}
									onPress={handleSubmit(validateOrder)}
									px={"10"}
								>
									Valider
								</Button>
							</HStack>
						</>
					) : (
						<Box px={"5"} alignItems={"center"} justifyContent={"center"}>
							<Box py={"10"}>
								<Heading mb={"2"}>Veillez-Vous Authentifier!</Heading>
								<Text mb={"10"}>
									Connectez-vous ou créez un compte pour pouvoir commander des
									tickets
								</Text>
								<Button
									_text={{ textAlign: "center" }}
									onPress={() => navigation.push("Login")}
								>
									Se Connecter
								</Button>
								<Button
									mb={"10"}
									mt='3'
									onPress={() => navigation.push("Signup")}
									variant={"outline"}
								>
									Créer un compte
								</Button>
							</Box>
						</Box>
					)}
				</Actionsheet.Content>
			</Actionsheet>
		</>
	);
}
