import React, { useState, useEffect } from "react";
import {
	Box,
	VStack,
	Image,
	Text,
	AspectRatio,
	Pressable,
	Container,
} from "native-base";
import { dformat } from "../../utils/dFormat";

export default function EventCard({ data, navigation }) {
	return (
		<Box
			mx='5'
			shadow={"9"}
			bgColor={"coolGray.50"}
			borderColor='coolGray.200'
			mx='2'
		>
			<Pressable
				onPress={() => navigation.push("DetailEvent", { id: data.id })}
			>
				<VStack pb='5' space={3} justifyContent='space-between'>
					<AspectRatio w='100%' ratio={4 / 3}>
						<Image
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
								{dformat(data?.date_debut, "lll")}
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
							<Text
								_dark={{
									color: "warmGray.50",
								}}
								color='coolGray.800'
								mt={"1"}
								noOfLines={1}
								isTruncated
								fontSize={"md"}
							>
								{data?.organisateur}
							</Text>
							<Text
								_dark={{
									color: "warmGray.50",
								}}
								color='gray.600'
								noOfLines={1}
								isTruncated
								fontSize={"sm"}
							>
								{data?.ville + " , " + data?.lieu}
							</Text>
						</Container>
					</VStack>
				</VStack>
			</Pressable>
		</Box>
	);
}
