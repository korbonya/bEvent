import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import {
	Box,
	Text,
	Pressable,
	Heading,
	IconButton,
	Icon,
	HStack,
	Avatar,
	VStack,
	Spacer,
	Button,
} from "native-base";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";
import AppBar2 from "../../common/components/headers/AppBar2";

export default function DetailTicket({route, navigation}) {
	const {data} = route.params
	console.log(data)
	return (
		<Box>
			<AppBar2 title="Ticket" />
            <Box p='2' pb={'5'} shadow={'9'} rounded={'3xl'} mt={'-35px'} bgColor='coolGray.50' mx='5'>
            <Box my='2' borderRadius='md'>
				<Pressable onPress={() => console.log("You touched me")}>
					<Box pl='4' pr='5' py='2'>
						<HStack alignItems='center' space={3}>
							{/* <Avatar size="48px" source={{ uri: item.avatarUrl }} /> */}
							<VStack>
								<Text
									color='coolGray.800'
									_dark={{ color: "warmGray.50" }}
									bold
								>
									{data.type}
								</Text>
								<Text color='primary.700' bold fontSize='lg' _dark={{ color: "warmGray.200" }}>
									{data.evenement}
								</Text>
                                <Text mt={'4'} >Date:</Text>
								<Text bold>{data.date}</Text>
							</VStack>
							<Spacer />
							<VStack>
								{/* <Text
									fontSize='xs'
									color='coolGray.800'
									_dark={{ color: "warmGray.50" }}
									alignSelf='flex-start'
								>
									Tickets
								</Text>
								<Text bold fontSize={'md'}>40</Text> */}
                                <Button variant={'outline'} mt={'4'}>Carte</Button>
							</VStack>
						</HStack>
					</Box>
				</Pressable>
			</Box>

			<Box mt={'8'} width={"full"}>
				<Heading pl={'5'} mb={'5'} fontSize='md'>QRcode</Heading>
				<Box justifyContent={'space-between'} alignItems={'center'}>
                    <QRCode size={300} value='http://awesome.link.qr' />
                </Box>
			</Box>
            </Box>

            <Box mt={'4'} mx={'5'} p='2' flexDir='row' alignItems={'center'} justifyContent={'space-between'}>
				<Button
                    py={'3'}
                    _text={{
                        color:'gray.900'
                    }}
                    bgColor='gray.50'
                    shadow='9'
                    borderRadius={'md'}
					rightIcon={
						<Icon ml={'10'} as={Ionicons} name='share' size='sm' />
					}
				>
					Partager
				</Button>
				<Button
                 py={'3'}
                 _text={{
                     color:'gray.900'
                 }}
                 bgColor='gray.50'
                 borderRadius={'md'}
                 shadow='9'
					rightIcon={
						<Icon ml='8' as={Ionicons} name='cloud-upload-outline' size='sm' />
					}
				>
					inviter un ami
				</Button>
			</Box>
		</Box>
	);
}
