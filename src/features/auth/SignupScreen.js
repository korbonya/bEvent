import React, {useEffect} from "react";
import {
	Box,
	Heading,
	VStack,
	FormControl,
	Button,
	ScrollView,
} from "native-base";
import AppBar2 from "../../common/components/headers/AppBar2";
import { useForm, Controller } from "react-hook-form";
import { LogBox } from "react-native";
import {useSignUpMutation} from './authApi'
import {InputText, InputPass} from '../../common/components/Inputs/InputText'


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
	};
	return (
		<>
			{/* <AppBar2 navigation={navigation} title={"Compte"} /> */}
			<ScrollView>
				<Box px={"5"} p='2' py='8'>
					<Heading pt={'20'}>
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
									<InputText 
									onChangeText={onChange}
									value={value}
									label={'Nom'}
									/>
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
									<InputText 
									onChangeText={onChange}
									value={value}
									label={'Prénom'}
									/>
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
									<InputText 
									onChangeText={onChange}
									value={value}
									label={'Numéro de téléphone'}
									/>
									{/* <FormControl.Label
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
										placeholder='Entrez votre Numéro de téléphone' /> */}
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
									<InputPass 
									onChangeText={onChange}
									value={value}
									label={'Mot de passe'}
									/>
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
