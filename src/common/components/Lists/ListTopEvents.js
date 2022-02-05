import React from "react";
import {
	Box,
	FlatList,
	Heading,
	VStack,
	Text,
	Pressable,
	AspectRatio,
    Image
} from "native-base";
import { dformat } from "../../utils/dFormat";

export default function ListTopEvents({data, navigation}) {
	return (
		<Box
			w={{
				base: "100%",
				md: "25%",
			}}
		>
			<Heading fontSize='lg' mt={'4'} px={'2'} pb='1'>
				Top des Évenements
			</Heading>
			<FlatList
				data={data?data:[]}
				
                horizontal
                showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<Box
						bgColor={'coolGray.50'}
						borderRadius={'md'}
						shadow={'2'}
						width={'48'}
                        mx='2'
						my='2'
					>
					<Pressable onPress={()=> navigation.push('DetailEvent', {id:item.id})}>
					<VStack pb={'4'} justifyContent='space-between'>
							<AspectRatio width='100%' ratio={1/1}>
							<Image
								borderTopRadius={'md'}
								source={{
									uri: `https://eventapp.elitegroupe.net/storage/${item.image}`,
								  }}
                                alt={item?.titre}
							/>
							</AspectRatio>
							<VStack pl='2'>
							<Text
								mt={'1'}
								fontSize='sm'
								_dark={{
									color: "warmGray.50",
								}}
								color='primary.500'
								alignSelf='flex-start'
							>
							 {dformat(item.date_debut, 'lll')}
							</Text>
							<Text
									_dark={{
										color: "warmGray.50",
									}}
									color='coolGray.800'
									bold
									fontSize={'md'}
								>
									{item.titre}
								</Text>
							</VStack>
						</VStack>
					</Pressable>
					</Box>
				)}
				keyExtractor={(item) => item.id}
			/>
		</Box>
	);
}
