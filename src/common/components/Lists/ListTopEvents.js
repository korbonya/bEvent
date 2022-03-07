import React from "react";
import {
	Box,
	FlatList,
	Heading,
	VStack,
	Text,
	Pressable,
	AspectRatio,
    Image, 
	Icon,
	HStack
} from "native-base";
import { dformat } from "../../utils/dFormat";
import {MaterialIcons} from '@expo/vector-icons'

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
						borderRadius={'2xl'}
						
						width={'56'}
                        mx='2'
						my='2'
					>
					<Pressable onPress={()=> navigation.push('DetailEvent', {id:item.id})}>
					<VStack pb={'4'} justifyContent='space-between'>
							<AspectRatio width='100%' ratio={4/3}>
							<Image
								borderRadius={'2xl'}
								source={{
									uri: `https://bevent-admin.elitegroupe.net/storage/${item.image}`,
								  }}
                                alt={item?.titre}
							/>
							</AspectRatio>
							<VStack px='4'>
							<Text
								mt={'2'}
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
									isTruncated
								>
									{item.titre}
								</Text>
							</VStack>
							<HStack alignItems={'center'} mx={'4'} py={'1'}>
								<Icon mr={'2'} as={MaterialIcons} color={'coolGray.500'} name="place" size={'xs'} />
								<Text fontSize={'xs'} isTruncated w={'90%'}>{`${item.ville} / ${item.lieu}`}</Text>
							</HStack>
						</VStack>
					</Pressable>
					</Box>
				)}
				keyExtractor={(item) => item.id}
			/>
		</Box>
	);
}
