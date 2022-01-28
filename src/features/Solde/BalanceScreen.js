import React from "react";
import {
	Box,
	HStack,
	VStack,
	Spacer,
	Text,
	FlatList,
	Heading,
	Button,
	ScrollView,
	Fab,
} from "native-base";
import AppBar2 from "../../common/components/headers/AppBar2";

export default function BalanceScreen() {
	return (
		<ScrollView>
			<AppBar2 title={"Mon Solde"} />
			<Box flex={1}>
				<Box
					mx={"5"}
					my={"10"}
					px={"10"}
					py={"2"}
					rounded={"xl"}
					bgColor={"blue.100"}
				>
					<Heading fontWeight={"semibold"}>Votre Solde</Heading>
					<Text bold pt={"10"} fontSize={"3xl"}>
						5 000 000 GNF
					</Text>
				</Box>
				<Box px='5'>
					<Heading pb={"5"}>Liste des Transactions</Heading>
					{[1, 3, 4, 5].map((i) => (
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
										Recharge
									</Text>
									<Text
										color='coolGray.600'
										_dark={{
											color: "warmGray.200",
										}}
									>
										50 000 GNF
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
				<Fab
					shadow={"0"}
					renderInPortal={false}
					rounded={"lg"}
					mb={"5"}
					colorScheme='blue'
					placement='bottom'
					label='Recharger votre compte'
				/>
			</Box>
		</ScrollView>
	);
}
