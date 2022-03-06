import React, { useEffect, useCallback } from "react";
import {
	Box,
	Fab,
	Heading,
	Spinner,
	ScrollView,
	Text,
	Avatar,
	Button,
	VStack,
	HStack,
	Icon,
	IconButton,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { RefreshControl } from "react-native";
import { useGetProfilQuery, useLogoutMutation } from "./authApi";
import { deleteUser } from "../../common/utils/secureStore";
import { forceLogout } from "./authSlice";

export default function ProfilScreen({ navigation }) {
	const [
		logout,
		{
			data: response,
			isSuccess: successLogout,
			error: logoutError,
			isLoading: loadLogout,
		},
	] = useLogoutMutation();
	const {
		data,
		isSuccess,
		refetch,
		isLoading,
		error,
		isError,
	} = useGetProfilQuery();
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}, []);

	useEffect(async () => {
		if (error) {
			await deleteUser();
			dispatch(forceLogout());
			//   navigation.push('Login')
		}
	}, [error]);
	const handleLogout = async () => {
		await logout();
		await deleteUser();
	};
	console.log("profile", data);
	return (
		<>
			{isLoading ? (
				<Box flex={1} justifyContent={"center"} alignItems={"center"}>
					<Spinner accessibilityLabel='Chargement' />
				</Box>
			) : (
				<ScrollView
					bgColor={"gray.100"}
					_contentContainerStyle={{
						pt: "10",
					}}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					<Box flex={"1"} justifyContent={"center"} alignItems='center'>
            <HStack alignItems={'flex-end'}>
            <Avatar
							size='150px'
							shadow={"8"}
              borderRadius={'64'}
							source={{
								uri:
									"https://duux.com/wp-content/uploads/2019/12/68824649-man-standaard-placeholder-avatar-profiel-gray-picture-ge%C3%AFsoleerd-op-witte-achtergrond-voor-uw-ontwerp-.jpg",
							}}
						/>

						<IconButton
							borderWidth={"0"}
							colorScheme='primary'
							variant={"solid"}
              bgColor={'primary.300'}
              ml={'-50px'}
              shadow={'9'}
              borderRadius={'2xl'}
							_icon={{
								as: MaterialIcons,
								name: "edit",
							}}
						/>
            </HStack>

						<Heading my={"5"}>{data?.prenom + " " + data?.nom}</Heading>
					</Box>
					<VStack mx={"5"} space={"2"} my={"5"}>
						<HStack
							py={"2"}
							px={"4"}
							bgColor={"gray.50"}
							borderTopRadius={"2xl"}
							shadow={"0"}
							alignItems={"center"}
						>
							<Icon
								opacity={0.5}
								fontWeight='light'
								mr={"5"}
								as={MaterialIcons}
								name='email'
							/>
							<Box>
								<Heading fontSize={"lg"} fontWeight={"bold"}>
									Adresse Mail
								</Heading>
								<Text color={"gray.500"} fontWeight={"bold"} fontSize={"md"}>
									{data?.email}
								</Text>
							</Box>
						</HStack>
						<HStack
							py={"2"}
							px={"4"}
							bgColor={"gray.50"}
							borderTopRadius={"2xl"}
							shadow={"0"}
							alignItems={"center"}
						>
							<Icon
								opacity={0.5}
								fontWeight='light'
								mr={"5"}
								as={MaterialIcons}
								name='phone'
							/>
							<Box>
								<Heading fontSize={"lg"} fontWeight={"bold"}>
									Téléphone
								</Heading>
								<Text color={"gray.500"} fontWeight={"bold"} fontSize={"md"}>
									{data?.telephone}
								</Text>
							</Box>
						</HStack>
						<HStack
							py={"2"}
							px={"4"}
							bgColor={"gray.50"}
							borderTopRadius={"2xl"}
							shadow={"0"}
							alignItems={"center"}
						>
							<Icon
								opacity={0.5}
								fontWeight='light'
								mr={"5"}
								as={MaterialIcons}
								name='where-to-vote'
							/>
							<Box>
								<Heading fontSize={"lg"} fontWeight={"bold"}>
									Adresse
								</Heading>
								<Text color={"gray.500"} fontWeight={"bold"} fontSize={"md"}>
									{data?.adresse}
								</Text>
							</Box>
						</HStack>
					</VStack>

					<Box
						mt={"20"}
						flex={1}
					
						borderTopWidth={"1"}
						pt='5'
						w={"full"}
						h='full'
						borderColor={"gray.300"}
					>
			
						<Fab
            label={'Se déconnecter'}
              mb={'16'}
              shadow={'0'}
              w={'full'}
              mx={'5'}
							onPress={handleLogout}
							variant={"solid"}
							colorScheme='danger'
						/>
						
					</Box>
				</ScrollView>
			)}
		</>
	);
}
