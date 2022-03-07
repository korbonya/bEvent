import React from "react";
import {
	Box,
	HStack,
	VStack,
	Text,
	Image,
	Pressable,
	Heading,
	Container,
} from "native-base";
import { dformat } from "../../utils/dFormat";

export default function AutherEvents({ data, navigation, filter = "" }) {
	console.log(filter == "CONCERT");
	return (
		<Box
			w={{
				base: "100%",
				md: "25%",
			}}

			key={'keyOther'}
		>
			{data?.map((item) => (
				<>
					{!filter ? (
						<Box
							key={"keyOthe" + item.id}
							bgColor='coolGray.50'
							my='2'
							mx='2'
							shadow='3'
						>
							<Pressable
								onPress={() => navigation.push("DetailEvent", { id: item.id })}
							>
								<HStack justifyContent='flex-start'>
									<Image
										size='120px'
										source={{
											uri: `https://bevent-admin.elitegroupe.net/storage/${item.image}`,
										}}
										alt={item.titre}
									/>
									<VStack  w={'full'}>
										<Container px={'3'}>
											<Text
												mt={"1"}
												fontSize='sm'
												_dark={{
													color: "warmGray.50",
												}}
												color='primary.500'
												alignSelf='flex-start'
											>
												{dformat(item.date_debut, "lll")}
											</Text>
											<Text
												_dark={{
													color: "warmGray.50",
												}}
												color='coolGray.800'
												bold
                                                noOfLines={1}

                                                isTruncated
												fontSize={"md"}
											>
												{item.titre}
											</Text>
                                            <Text
												_dark={{
													color: "warmGray.50",
												}}
												color='coolGray.800'
												mt={'1'}
                                                noOfLines={1}

                                                isTruncated
												fontSize={"sm"}
											>
												{item.organisateur}
											</Text>
                                            <Text
												_dark={{
													color: "warmGray.50",
												}}
												color='gray.600'
                                                noOfLines={1}
                                                isTruncated
												fontSize={"xs"}
											>
												{item.ville +" , " + item.lieu}
											</Text>
										</Container>
									</VStack>
								</HStack>
							</Pressable>
						</Box>
					) : item.type == filter ? (
						<Box key={'other'+item.id} bgColor='coolGray.50' my='2' mx='2' shadow='3'>
								<Pressable
								onPress={() => navigation.push("DetailEvent", { id: item.id })}
							>
								<HStack justifyContent='flex-start'>
									<Image
										size='120px'
										source={{
											uri: `https://bevent-admin.elitegroupe.net/storage/${item.image}`,
										}}
										alt={item.titre}
									/>
									<VStack  w={'full'}>
										<Container px={'3'}>
											<Text
												mt={"1"}
												fontSize='sm'
												_dark={{
													color: "warmGray.50",
												}}
												color='primary.500'
												alignSelf='flex-start'
											>
												{dformat(item.date_debut, "lll")}
											</Text>
											<Text
												_dark={{
													color: "warmGray.50",
												}}
												color='coolGray.800'
												bold
                                                noOfLines={1}

                                                isTruncated
												fontSize={"md"}
											>
												{item.titre}
											</Text>
                                            <Text
												_dark={{
													color: "warmGray.50",
												}}
												color='coolGray.800'
												mt={'1'}
                                                noOfLines={1}

                                                isTruncated
												fontSize={"sm"}
											>
												{item.organisateur}
											</Text>
                                            <Text
												_dark={{
													color: "warmGray.50",
												}}
												color='gray.600'
                                                noOfLines={1}
                                                isTruncated
												fontSize={"xs"}
											>
												{item.ville +" , " + item.lieu}
											</Text>
										</Container>
									</VStack>
								</HStack>
							</Pressable>
						</Box>
					) : null}
				</>
			))}
		</Box>
	);
}
