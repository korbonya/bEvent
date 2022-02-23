import React, {useEffect, useCallback, useState} from "react";
import {
	Box,
	HStack,
	VStack,
	Spacer,
	Text,
	Heading,
	ScrollView,
	Input,
	Actionsheet,
	useDisclose,
	Button,
	Spinner
} from "native-base";
import {RefreshControl} from 'react-native'

import AppBar2 from "../../common/components/headers/AppBar2";
import { useProvideBalanceMutation, useGetBalanceQuery } from "./balanceApi";
import { deleteUser } from "../../common/utils/secureStore";

export default function BalanceScreen({navigation}) {
	const { data, refetch, isLoading, error } = useGetBalanceQuery();
	const [montant, setMontant] = useState('')
	const [password, setPassword] = useState('')
	const [
		provideBalance,
		{data:response, isLoading: loadProvide, isSuccess },
	] = useProvideBalanceMutation();
	const { isOpen, onOpen, onClose } = useDisclose();
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}, []);

	useEffect(async () => {
		if(error && error.status == 401){
		  await deleteUser()
		  navigation.navigate('Login')
		}
	  })

	console.log('the response', response)
	console.log('le solde  ', data)
	console.log('is error ', error)
	return (
		<ScrollView
		refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
		  }
		>
			<AppBar2 title={"Mon Solde"} navigation={navigation} back={false} />
			{isLoading?<Box flex={1} justifyContent={'center'} alignItems={'center'} >
    <Spinner accessibilityLabel="Chargement" /> </Box>:<Box flex={1}>
				<Box
					mx={"5"}
					my={"10"}
					px={"10"}
					py={"2"}
					rounded={"xl"}
					bgColor={"blue.100"}
				>
					<Heading fontWeight={"semibold"}>Votre Solde</Heading>
					<Text bold pt={"10"} fontSize={"xl"}>
						{data ? data.solde + " GNF" : "..."}
					</Text>
				</Box>
				<Box px='5'>
					<Heading pb={"5"}>Liste des Transactions</Heading>
					{data?.recharges?.map((rech) => (
						<Box
							key={i}
							borderBottomWidth='1'
							_dark={{
								borderColor: "gray.600",
							}}
							borderColor='coolGray.200'
							pl='4'
							pr='5'
							py='5'
						>
							<HStack space={3} justifyContent='space-between'>
								<VStack>
									<Text
										_dark={{
											color: "warmGray.50",
										}}
										color='coolGray.800'
										bold
									>
										{data?.operateur}
									</Text>
									<Text
										color='coolGray.600'
										_dark={{
											color: "warmGray.200",
										}}
									>
										{data?.montant} GNF
									</Text>
								</VStack>
								<Spacer />
								<Text
									fontSize='xs'
									_dark={{
										color: "warmGray.50",
									}}
									color='green.600'
									alignSelf='flex-start'
								>
									effectué
								</Text>
							</HStack>
						</Box>
					))}
				</Box>
				{data?.recharges.length === 0 && (
					<Box mx={'5'} my={'10'}>
						<Text fontSize={'lg'} textAlign={'center'}>Aucune Transactions</Text>
					</Box>
				)}
				<Button mt={'10'} mx={'5'} onPress={onOpen}>Rechargez votre compte</Button>
				<Actionsheet isOpen={isOpen} onClose={onClose}>
					<Actionsheet.Content>
						<Box w='100%' h={60} px={4} alignItems={'center'} justifyContent='center'>
							<Text
								fontSize='16'
								color='gray.500'
								_dark={{
									color: "gray.300",
								}}
							>
								Réchargez votre compte
							</Text>
						</Box>
						<Actionsheet.Item w={'full'} justifyContent={'center'} >
							<Input placeholder="Montant" variant={'outline'} w={'80'} value={montant} onChangeText={(val) => setMontant(val)} placeholder="Numéro de téléphone"/>
						</Actionsheet.Item>
						<Actionsheet.Item justifyContent={'center'}>
							<Input placeholder="Mot de passe" variant={'outline'} w={'80'}  value={password} onChangeText={(val)=> setPassword(val)} placeholder="Mot de passe"/>
						</Actionsheet.Item>
						<Button px={'10'} onPress={async() => await provideBalance({montant, password})}>Valider</Button>
					</Actionsheet.Content>
				</Actionsheet>
			</Box>}
		</ScrollView>
	);
}
