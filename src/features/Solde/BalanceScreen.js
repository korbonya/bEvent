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
	Spinner,
	Icon
} from "native-base";
import {RefreshControl} from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 

import { useDispatch } from "react-redux";
import { forceLogout } from "../auth/authSlice";

import AppBar2 from "../../common/components/headers/AppBar2";
import { useProvideBalanceMutation, useGetBalanceQuery } from "./balanceApi";
import { deleteUser } from "../../common/utils/secureStore";

export default function BalanceScreen({navigation}) {
	const dispatch = useDispatch()
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
		if(error){
		  await deleteUser()
		  dispatch(forceLogout())
		//   navigation.push('Login')
		}else if (response){
			navigation.push('webview', {url:response.pay_token})
		}
	  },[error, response])

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
					mb={"10"}
					px={"10"}
					py={"4"}
					shadow='2'
					rounded={"2xl"}
					bgColor={"primary.100"}
				>
					<Heading fontSize={'md'} fontWeight={"semibold"}>Votre Solde</Heading>
					<Text bold pt={"2"} fontSize={"xl"}>
						{data ? data.solde + " GNF" : "..."}
					</Text>
					<Button borderRadius={'lg'} leftIcon={<Ionicons name="add" size={24} color="white" />} mt={'5'} mx={'5'} bgColor={'primary.300'} variant="solid" onPress={onOpen}>Rechargez votre compte</Button>

				</Box>
				<Box px='5'>
					<Heading fontSize={'lg'} pb={"5"}>Liste des Transactions</Heading>
					{data?.recharges?.map((data, i) => (
						<Box
							key={i}
							bgColor={'coolGray.100'}
							my='1'
							_dark={{
								borderColor: "gray.600",
							}}
							pl='4'
							pr='5'
							py='5'
							borderRadius={'xl'}
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
								{data.statuts == -1 ?<Text
									fontSize='xs'
									_dark={{
										color: "warmGray.50",
									}}
									color='red.600'
									alignSelf='flex-start'
								>
									annulée
								</Text>:data.statuts === 0 ?<Text
									fontSize='xs'
									_dark={{
										color: "warmGray.50",
									}}
									color='gray.600'
									alignSelf='flex-start'
								>
									En attente
								</Text>:<Text
									fontSize='xs'
									_dark={{
										color: "warmGray.50",
									}}
									color='green.600'
									alignSelf='flex-start'
								>
									succès
								</Text>

								}
							</HStack>
						</Box>
					))}
				</Box>
				{data?.recharges.length === 0 && (
					<Box mx={'5'} my={'10'}>
						<Text fontSize={'lg'} textAlign={'center'}>Aucune Transactions</Text>
					</Box>
				)}
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
								Récharger mon compte
							</Text>
						</Box>
						<Actionsheet.Item w={'full'} justifyContent={'center'} >
							<Input placeholder="Montant" keyboardType="numeric" size={'lg'}  variant={'filled'} w={'80'} value={montant} onChangeText={(val) => setMontant(val)} placeholder="Montant de la recharge"/>
						</Actionsheet.Item>
						<Actionsheet.Item justifyContent={'center'}>
							<Input placeholder="Mot de passe" type="password" size={'lg'} variant={'filled'} w={'80'}  value={password} onChangeText={(val)=> setPassword(val)} placeholder="Mot de passe"/>
						</Actionsheet.Item>
						<Button  isLoading={loadProvide} disabled={loadProvide||montant===""||password===''} px={'10'} onPress={async () => provideBalance({montant, password})}>Valider</Button>
					</Actionsheet.Content>
				</Actionsheet>
			</Box>}
		</ScrollView>
	);
}
