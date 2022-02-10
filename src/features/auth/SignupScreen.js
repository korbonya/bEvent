import React, {useEffect} from "react";
import {
	Box,
	Heading,
	VStack,
	FormControl,
	Input,
	Button,
	ScrollView,
} from "native-base";
import AppBar2 from "../../common/components/headers/AppBar2";
import { useForm, Controller } from "react-hook-form";
import { LogBox } from "react-native";
import {useSignUpMutation} from './authApi'


LogBox.ignoreLogs(['NativeBase:']);

export default function SignupScreen({ navigation }) {
	const [show, setShow] = React.useState(false);
	const [signup, { data: response, error, isError, isSuccess, isLoading }] = useSignUpMutation();
	const {
		control, handleSubmit, watch, formState: { errors },
	} = useForm({
		defaultValues: {
			prenom: "",
			nom: "",
			telephone: "",
			password: "",
		},
	});
	useEffect(() => {
		if (isSuccess) {
			console.log('response', response);
			navigation.navigate('Validate', {
				telephone: watch('telephone'),
				password: watch('password')
			});
		} else if (isError) {
			console.log('the error ::', error);
		}
	}, [isError, isSuccess]);

	console.log('the response ', response);

	const onSubmit = async (data) => {
		await signup(data);
		//    if(isSuccess ) {
		//        console.log('response', response)
		//        navigation.navigate('Validate', {
		//            telephone:data.telephone
		//        })
		//    }else if(isError) {
		//        console.log('the error ::', error)
		//    }
	};
	return (
		<>
			<AppBar2 navigation={navigation} title={"Compte"} />
			<ScrollView>
				<Box px={"5"} p='2' py='8'>
					<Heading>
						Inscription
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
						Inscrivez-vous et continuez!
					</Heading>
					<VStack space={3} mt='5'>
						<Controller
							control={control}
							rules={{
								maxLength: 100,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<FormControl>
									<FormControl.Label
										_text={{
											fontSize: "lg",
											fontWeight: "bold",
										}}
									>
										Nom
									</FormControl.Label>
									<Input
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										variant={"filled"}
										bgColor='coolGray.100'
										fontSize={'lg'}
										placeholder='Entrez votre nom' />
								</FormControl>
							)}
							name='nom' />

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
										Prénom
									</FormControl.Label>
									<Input
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										variant={"filled"}
										bgColor='coolGray.100'
										fontSize={'lg'}
										placeholder='Entrez votre Prénom' />
								</FormControl>
							)}
							name='prenom' />
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
										fontSize={'lg'}
										placeholder='Entrez votre Numéro de téléphone' />
								</FormControl>
							)}
							name='telephone' />
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
										fontSize={'lg'}

										InputRightElement={<Button
											size='sm'
											variant={'outline'}
											rounded='none'
											w={"16"}
											h='full'

											onPress={() => setShow(!show)}
										>
											{show ? "Cacher" : "Voir"}
										</Button>}
										placeholder='Entrez votre mot de passe' />
								</FormControl>
							)}
							name='password' />

						<Button isLoading={isLoading} isLoadingText="Inscription" onPress={handleSubmit(onSubmit)} size={"lg"} mt='2'>
							Créer votre compte
						</Button>

					</VStack>
				</Box>
			</ScrollView>
		</>
	);
}
