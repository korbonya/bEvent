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
	Icon
} from "native-base";
import { dformat } from "../../utils/dFormat";
import {MaterialIcons} from '@expo/vector-icons'

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
							borderRadius={'2xl'}
						>
							<Pressable
								onPress={() => navigation.push("DetailEvent", { id: item.id })}
							>
								<HStack justifyContent='flex-start'>
									<Image
										size='130px'
										borderRadius={'xl'}
										source={{
											uri: `https://bevent-admin.elitegroupe.net/storage/${item.image}`,
										}}
										alt={item.titre}
									/>
									<VStack justifyContent={'center'} w={'full'}>
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
												fontSize={"sm"}
											>
												{item.titre}
											</Text>
											<Box mt={'3'} bgColor={'orange.100'}>
											<Text
												_dark={{
													color: "warmGray.50",
												}}
												color='coolGray.800'
												
                                                noOfLines={1}
                                                isTruncated
												fontSize={"xs"}
											>
												{item.organisateur}
											</Text>
											</Box>
                                            <HStack alignItems={'center'}  py={'1'}>
												<Icon mr={'2'} as={MaterialIcons} color={'coolGray.500'} name="place" size={'xs'} />
												<Text fontSize={'xs'} isTruncated w={'90%'}>{`${item.ville} / ${item.lieu}`}</Text>
											</HStack>
										</Container>
									</VStack>
								</HStack>
							</Pressable>
						</Box>
					) : item.type == filter ? (
						<Box
							key={"others" + item.id}
							bgColor='coolGray.50'
							my='2'
							mx='2'
							borderRadius={'2xl'}
						>
							<Pressable
								onPress={() => navigation.push("DetailEvent", { id: item.id })}
							>
								<HStack justifyContent='flex-start'>
									<Image
										size='130px'
										borderRadius={'xl'}
										source={{
											uri: `https://bevent-admin.elitegroupe.net/storage/${item.image}`,
										}}
										alt={item.titre}
									/>
									<VStack justifyContent={'center'} w={'full'}>
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
												fontSize={"sm"}
											>
												{item.titre}
											</Text>
											<Box mt={'3'} bgColor={'orange.100'}>
											<Text
												_dark={{
													color: "warmGray.50",
												}}
												color='coolGray.800'
												
                                                noOfLines={1}
                                                isTruncated
												fontSize={"xs"}
											>
												{item.organisateur}
											</Text>
											</Box>
                                            <HStack alignItems={'center'}  py={'1'}>
												<Icon mr={'2'} as={MaterialIcons} color={'coolGray.500'} name="place" size={'xs'} />
												<Text fontSize={'xs'} isTruncated w={'90%'}>{`${item.ville} / ${item.lieu}`}</Text>
											</HStack>
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
