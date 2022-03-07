import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/features/home/HomeScreen";
import DetailEventScreen from "./src/features/Events/DetailEventScreen";
import TicketsScreen from "./src/features/Tickets/TicketsScreen";
import DetailTicket from "./src/features/Tickets/DetailTicket";
import BalanceScreen from "./src/features/Solde/BalanceScreen";
import WebViewScreen from "./src/features/Solde/WebViewScreen";
import ProfilScreen from "./src/features/auth/ProfilScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SignupScreen from "./src/features/auth/SignupScreen";
import ValidationScreen from "./src/features/auth/ValidationScreen";
import LoginScreen from "./src/features/auth/LoginScreen";
import AuthScreen from "./src/features/auth/AuthScreen";
import { store } from "./src/app/store";
import { Provider, useSelector } from "react-redux";
import * as SystemUI from 'expo-system-ui';
import { theme } from "./src/app/theme";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  SystemUI.setBackgroundColorAsync("red");
	const { isLoggedIn } = useSelector((state) => state.auth);
	console.log("the user is ", isLoggedIn);
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				lazy: true,

				tabBarStyle: {
					backgroundColor: "#e6eafe",
					height: 75,
					paddingBottom: 5,
          paddingTop:5,
          borderTopStartRadius:20,
          borderTopEndRadius:20
				},
				tabBarLabelStyle: {
					fontSize: 16,
					fontWeight: "700",
				},
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Accueil") {
						iconName = focused ? "home-variant" : "home-thermometer-outline";
					} else if (route.name === "Tickets") {
						iconName = focused ? "ticket-account" : "ticket-account";
					} else if (route.name === "Solde") {
						iconName = focused ? "wallet-giftcard" : "wallet-giftcard";
					} else if (route.name === "Compte") {
						iconName = focused ? "account" : "account";
					}

					// You can return any component that you like here!
					return (
						<Box
							bgColor={focused ? "primary.100" : "transparent"}
							py={"1"}
							px={focused ? "5" : "0"}
							rounded={"3xl"}
						>
							<MaterialCommunityIcons
								name={iconName}
								size={size}
								color={color}
							/>
						</Box>
					);
				},
				tabBarActiveTintColor: "#0825dd",
				tabBarInactiveTintColor: "gray",
			})}
		>
			<Tab.Screen name='Accueil' component={HomeScreen} />
			<Tab.Screen
				name='Tickets'
				component={isLoggedIn ? TicketsScreen : AuthScreen}
			/>
			<Tab.Screen
				name='Solde'
				component={isLoggedIn ? BalanceScreen : AuthScreen}
			/>
			<Tab.Screen
				name='Compte'
				component={isLoggedIn ? ProfilScreen : AuthScreen}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	//   const user = useSelector(selectedUser)
	// const loggedIn = useSelector(isLoggedIn)

	// console.log('it is the islgged :::', user)

	const config = {
		animation: "spring",
		config: {
			stiffness: 1000,
			damping: 500,
			mass: 3,
			overshootClamping: true,
			restDisplacementThreshold: 0.01,
			restSpeedThreshold: 0.01,
		},
	};

	return (
		<Provider store={store}>
			<NativeBaseProvider theme={theme}>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
						}}
					>
						<Stack.Screen
							options={{
								transitionSpec: {
									open: TransitionSpecs.FadeInFromBottomAndroidSpec,
									close: TransitionSpecs.FadeOutToBottomAndroidSpec,
								},
							}}
							name='Home'
							component={HomeTabs}
						/>
						<Stack.Screen
							options={{
								transitionSpec: {
									open: TransitionSpecs.FadeInFromBottomAndroidSpec,
									close: TransitionSpecs.FadeOutToBottomAndroidSpec,
								},
							}}
							name='DetailEvent'
							component={DetailEventScreen}
						/>
						<Stack.Screen
							options={{
								transitionSpec: {
									open: config,
									close: config,
								},
							}}
							name='DetailTicket'
							component={DetailTicket}
						/>
						<Stack.Screen
							options={{
								transitionSpec: {
									open: TransitionSpecs.FadeInFromBottomAndroidSpec,
									close: TransitionSpecs.FadeOutToBottomAndroidSpec,
								},
							}}
							name='Signup'
							component={SignupScreen}
						/>
						<Stack.Screen
							options={{
								transitionSpec: {
									open: TransitionSpecs.FadeInFromBottomAndroidSpec,
									close: TransitionSpecs.FadeOutToBottomAndroidSpec,
								},
							}}
							name='Login'
							component={LoginScreen}
						/>
						<Stack.Screen
							options={{
								transitionSpec: {
									open: config,
									close: config,
								},
							}}
							name='Tickets'
							component={TicketsScreen}
						/>
						<Stack.Screen
							options={{
								transitionSpec: {
									open: config,
									close: config,
								},
							}}
							name='Balance'
							component={BalanceScreen}
						/>
						<Stack.Screen
							options={{
								transitionSpec: {
									open: config,
									close: config,
								},
							}}
							name='Validate'
							component={ValidationScreen}
						/>
						<Stack.Screen
							options={{
								transitionSpec: {
									open: config,
									close: config,
								},
							}}
							name='webview'
							component={WebViewScreen}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</NativeBaseProvider>
		</Provider>
	);
}
