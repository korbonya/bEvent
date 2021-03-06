import React, { useEffect } from "react";
import {
	Box,
	Heading,
	VStack,
	FormControl,
	Input,
	Button,
	ScrollView,
	Link,
	Text,
	Center,
	Image,
	AspectRatio,
	KeyboardAvoidingView
} from "native-base";
import { ImageBackground } from "react-native";
import AppBar2 from "../../common/components/headers/AppBar2";
import { useForm, Controller } from "react-hook-form";
import { LogBox } from "react-native";
import { useLoginMutation } from "./authApi";
// import { rootState } from "../../app/store";
import { useSelector } from "react-redux";
import { saveUser } from "../../common/utils/secureStore";
import { InputText, InputPass } from "../../common/components/Inputs/InputText";
import bgImage from "../../../assets/images/bg2.png";

LogBox.ignoreLogs(["NativeBase:"]);

export default function LoginScreen({ navigation }) {
	const [show, setShow] = React.useState(false);
	const { isLoggedIn } = useSelector((state) => state.auth);
	const [
		login,
		{ data, isLoading, isError, isSuccess, error },
	] = useLoginMutation();
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
	// useEffect(async ()=>{
	// 	if(isSuccess){
	// 		console.log('suceess')
	// 		await saveUser(data)
	// 		navigation.navigate('Home')
	// 	}else if(isError){
	// 		console.log('the errror is ', isError)
	// 		console.log('the error :', error)
	// 	}
	// },[isSuccess, isError])

	const onSubmit = async (data) => {
		console.log(data);
		try {
			await login(data)
				.unwrap()
				.then(async (response) => {
					await saveUser(response);
					navigation.navigate("Home");
				});
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<ScrollView>
				<Box safeArea={false} flex={1}>
				<Box mt={"-80px"}> 
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
						<Heading size={'2xl'} color={'white'}>Connexion</Heading>
						<Heading
							mt='1'
							mb={"5"}
							color='gray.50'
							_dark={{
								color: "warmGray.200",
							}}
							fontWeight='medium'
							size='md'
						>
							Connectez-vous et continuez!
						</Heading>
					</Box>
				</Box>
			{/* <AppBar2 navigation={navigation} title={"Compte"} /> */}
			<Box
				flex={1}
				w='full'
				px={"5"}
			
				p='2'
				py='8'
			>
			

				<VStack w='full' mt={'-20px'} space={3}>
				<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormControl>
								<InputText
									label={"Num??ro de T??l??phone"}
									onChangeText={onChange}
									value={value}
								/>
								{errors.telephone && (
									<Text color={"red.300"}>
										{" "}
										Veillez saisir le num??ro de t??l??phone.
									</Text>
								)}
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
								<InputPass
									label={"Mot de passe"}
									onChangeText={onChange}
									value={value}
								/>
								{errors.password && (
									<Text color={"red.300"}>
										{" "}
										le mot de passe est obligatoire.
									</Text>
								)}
								{error && <Text color={"red.300"}> {error?.data?.error} </Text>}
							</FormControl>
						)}
						name='password'
					/>
					<Link
							_text={{
								fontSize: "lg",
								fontWeight: "500",
								color: "primary.500",
							}}
							alignSelf='flex-end'
							mt='1'
						>
							Mot de passe Oubli???
						</Link>
					<Button
						isLoading={isLoading}
						isLoadingText='Connexion'
						onPress={handleSubmit(onSubmit)}
						size={"lg"}
						py='3'
						mt='1'
						shadow={"2"}
					>
						Se Connecter
					</Button>

				</VStack>
			</Box>
		</Box>
		</ScrollView>
	);
}
