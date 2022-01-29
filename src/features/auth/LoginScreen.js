import React, {useEffect} from "react";
import {
	Box,
	Heading,
	VStack,
	FormControl,
	Input,
	Button,
	ScrollView,
	Link,
} from "native-base";
import AppBar2 from "../../common/components/headers/AppBar2";
import { useForm, Controller } from "react-hook-form";
import { LogBox } from "react-native";
import {useLoginMutation} from './authApi'
import {rootState} from '../../app/store'


LogBox.ignoreLogs(['NativeBase:']);

export const LoginScreen = ({navigation}) => {
	const [show, setShow] = React.useState(false);
	const [login, {data, isLoading, isError, isSuccess}] = useLoginMutation()
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			telephone: "",
			password: "",
		},
	});
	useEffect(()=>{
		if(isSuccess){
			console.log('suceess')
			console.log('the state', rootState.auth)
		}else if(isError){
			console.log('the errror is ', isError)
		}
	})
	const onSubmit = async (data) => {
		if(data){
			await login(data)
		}
	}
	return (
		<>
			<AppBar2 navigation={navigation} title={"Compte"} />
			<ScrollView>
				<Box px={"5"} flex={1} p='2' py='8'>
					<Heading
						_dark={{
							color: "warmGray.50",
						}}
					>
						Connexion
					</Heading>
					<Heading
						mt='1'
						color='coolGray.600'
						_dark={{
							color: "warmGray.200",
						}}
						fontWeight='medium'
						size='xs'
					>
						Connectez-vous et continuez!
					</Heading>
					<VStack space={3} mt='5'>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<FormControl>
									<FormControl.Label
										_text={{
											fontSize: "lg",
											fontWeight: "bold",
										}}
									>
										Numéro de Téléphone
									</FormControl.Label>
									<Input
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										variant={"filled"}
										bgColor='coolGray.100'
										fontSize={"lg"}
										placeholder='Entrez votre Numéro de téléphone'
									/>
								</FormControl>
							)}
							name='telephone'
						/>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<FormControl>
									<FormControl.Label
										_text={{
											fontSize: "lg",
											fontWeight: "bold",
										}}
									>
										Mot de passe
									</FormControl.Label>
									<Input
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										type={show ? "text" : "password"}
										variant={"filled"}
										bgColor='coolGray.100'
										fontSize={"lg"}
										InputRightElement={
											<Button
												size='sm'
												variant={"gost"}
												rounded='none'
												w={"16"}
												h='full'
												onPress={() => setShow(!show)}
											>
												{show ? "Cacher" : "Voir"}
											</Button>
										}
										placeholder='Entrez votre mot de passe'
									/>
								</FormControl>
							)}
							name='password'
						/>

						<Button onPress={handleSubmit(onSubmit)} size={"lg"} mt='2'>
							Se Connecter
						</Button>
						<Link
							_text={{
								fontSize: "lg",
								fontWeight: "500",
								color: "primary.500",
							}}
							alignSelf='flex-end'
							mt='1'
						>
							Mot de passe Oublié?
						</Link>
					</VStack>
				</Box>
			</ScrollView>
		</>
	);
};
