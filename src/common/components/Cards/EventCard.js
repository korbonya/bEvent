import React, { useState, useEffect } from "react";
import {
	Box,
	VStack,
	Image,
	Text,
	AspectRatio,
	Pressable
} from "native-base";
import {dformat} from '../../utils/dFormat'

export default function EventCard({data, navigation}) {

	return (
		<Box
			mx='5'
			
			shadow={"9"}
			bgColor={'coolGray.50'}
			borderColor='coolGray.200'
			mx='2'
		>
			<Pressable onPress={()=> navigation.push('DetailEvent', {id:data.id})}>
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
					<Text
						fontSize='md'
                        color='red.700'
						_dark={{
							color: "warmGray.50",
						}}
						color='coolGray.800'
						alignSelf='flex-start'
					>
						du {dformat(data.date_debut, 'lll')} au {dformat(data.date_fin, 'lll')}
					</Text>
					<Text
						fontSize='lg'
						color='coolGray.800'
						bold
					>
						{data?.titre}
					</Text>

				</VStack>
			</VStack>
			</Pressable>
		</Box>
	);
}
