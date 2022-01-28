import React from "react";
import {
	Actionsheet,
	IconButton,
	Button,
	HStack,
	Heading,
	useDisclose,
	Text,
	Box,
	Fab,
	FormControl,
	Input,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function OrderAction() {
	const { isOpen, onOpen, onClose } = useDisclose();
	return (
		<>
			{/* <Fab
				width={"full"}
                renderInPortal={false}
				borderRadius='full'
				colorScheme='blue'
				placement='bottom-right'
				label='Commender'
				onPress={onOpen}
			/> */}
			<Button size={"lg"} my={"5"} onPress={onOpen}>
				Commander
			</Button>
			<Actionsheet isOpen={isOpen} onClose={onClose}>
				<Actionsheet.Content>
					<Box w='100%' py='5' px={4} justifyContent='center'>
						<Text fontSize='lg'>Concert Aliou Barry</Text>
						<Heading my={"2"} fontSize={"md"}>
							{" "}
							Ticket Platinium{" "}
						</Heading>
					</Box>
					<HStack justifyContent='space-between' alignItems={"center"}>
						<IconButton
							size='md'
							variant='solid'
							rounded={"full"}
							mx='12'
							_icon={{
								as: Feather,
								name: "minus",
							}}
						/>
						<Text bold fontSize={"lg"}>
							4 tickets
						</Text>

						<IconButton
							size='md'
							variant='solid'
							rounded={"full"}
							mx='12'
							_icon={{
								as: MaterialIcons,
								name: "add",
							}}
						/>
					</HStack>
         
					<Input borderWidth={'1'} mt={'5'} px={'4'} variant={'underlined'} p={2} placeholder='Entrez votre mot de passe...' />
                    
					<HStack mt={"10"}>
						<Button px={'10'} variant='outline' mr='3'>
							Annuler
						</Button>
						<Button px={'10'} >Valider</Button>
					</HStack>
				</Actionsheet.Content>
			</Actionsheet>
		</>
	);
}
