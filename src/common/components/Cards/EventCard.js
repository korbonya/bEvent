import React, { useState, useEffect } from "react";
import {
	Box,
	VStack,
	Image,
	Text,
	AspectRatio,
	Pressable,
	Container,
	Icon,
	HStack,
} from "native-base";
import { dformat } from "../../utils/dFormat";
import { MaterialIcons } from "@expo/vector-icons";

export default function EventCard({ data, navigation }) {
	return (
		<Box
			mx='5'
			shadow={"0"}
			bgColor={"coolGray.50"}
			borderColor='coolGray.200'
			borderRadius={"3xl"}
			mx='2'
		>
			<Pressable
				onPress={() => navigation.push("DetailEvent", { id: data.id })}
			>
				<VStack pb='5' space={3} justifyContent='space-between'>
					<AspectRatio w='100%' ratio={16 / 9}>
						<Image
							borderRadius={"3xl"}
							source={{
								uri: `https://bevent-admin.elitegroupe.net/storage/${data.image}`,
							}}
							alt='image'
						/>
					</AspectRatio>
					<VStack px={"5"}>
						<Container>
							<Text
								mt={"1"}
								fontSize='md'
								_dark={{
									color: "warmGray.50",
								}}
								color='primary.500'
								alignSelf='flex-start'
							>
								{dformat(data?.date_debut, "LLLL")}
							</Text>
							<Text
								_dark={{
									color: "warmGray.50",
								}}
								color='coolGray.800'
								bold
								noOfLines={1}
								isTruncated
								fontSize={"lg"}
							>
								{data?.titre}
							</Text>
							<Box mt={"3"} bgColor={"orange.100"}>
								<Text
									_dark={{
										color: "warmGray.50",
									}}
									color='coolGray.800'
									noOfLines={1}
									isTruncated
									fontSize={"xs"}
								>
									Organisé par : {data?.organisateur}
								</Text>
							</Box>
							<HStack alignItems={"center"} py={"1"}>
								<Icon
									mr={"2"}
									as={MaterialIcons}
									color={"coolGray.500"}
									name='place'
									size={"sm"}
								/>
								<Text
									fontSize={"sm"}
									isTruncated
									w={"90%"}
								>{`${data?.ville} / ${data?.lieu}`}</Text>
							</HStack>
						</Container>
					</VStack>
				</VStack>
			</Pressable>
		</Box>
	);
}
