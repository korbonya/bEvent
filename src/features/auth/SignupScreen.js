import React, {useEffect} from "react";
import {
	Box,
	Heading,
	VStack,
	FormControl,
	Button,
	ScrollView,
	Image,
	AspectRatio
} from "native-base";
import AppBar2 from "../../common/components/headers/AppBar2";
import { useForm, Controller } from "react-hook-form";
import { LogBox } from "react-native";
import {useSignUpMutation} from './authApi'
import {InputText, InputPass} from '../../common/components/Inputs/InputText'
import bgImage from "../../../assets/images/bg2.png";


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


	const onSubmit = async (data) => {
		await signup(data);
	};
	return (
		<>
			{/* <AppBar2 navigation={navigation} title={"Compte"} /> */}
			<ScrollView>
			<Box mt={"-120px"}> 
					<AspectRatio w='100%' ratio={1/1}>
						<Image
						w={'100%'}
						height="100%"
							source={bgImage}
							alt='image'
						/>
					</AspectRatio>
					<Box
						
						_text={{
							color: "gray.50",
							fontWeight: "700",
							fontSize: "xs",
						}}
						position='absolute'
						bottom='32'
						px='3'
						py='1.5'
					>
						<Heading color={'gray.50'} pt={'20'}>
						Inscription
					</Heading>
					<Heading
						mt='1'
						color='gray.50'
						_dark={{
							color: "warmGray.200",
						}}
						fontWeight='medium'
						size='xs'
					>
						Inscrivez-vous et continuez!
					</Heading>
					</Box>
				</Box>
				<Box px={"5"} p='2' py='8'>
					
					<VStack space={3} mt='-50px'>
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
									keyboard='default'
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
									keyboard='default'
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

						<Button isLoading={isLoading} isLoadingText="Inscription" onPress={handleSubmit(onSubmit)} 
						size={"lg"}
						py='3'
						mt='2'>
							Créer votre compte
						</Button>

					</VStack>
				</Box>
			</ScrollView>
		</>
	);
}
