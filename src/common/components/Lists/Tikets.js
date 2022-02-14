import React, {useState, useEffect} from "react";
import {
	Box,
	FlatList,
	VStack,
	Text,
	Spacer,
	Pressable
} from "native-base";

export default function Tickets({ticketId, setTicketId, data}) {
	const [active, setActive] = useState(1)
	useEffect(()=> {
		if(data){
			setActive(data[0]?.id)
			setTicketId(data[0]?.id)
		}
	},[data])
	
	return (
		<Box
			w={{
				base: "100%",
				md: "25%",
			}}
		>
			<FlatList
				data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<Box
						borderWidth='2'
						width={'40'}
                        p='5'
						borderColor={active==item.id?'primary.500':'gray.200'}
                        mx='2'
						bgColor={active==item.id?'transparent':'gray.200'}
					>
					<Pressable onPress={()=> {
						setActive(item.id)
						setTicketId(item.id)
					}}>
					<VStack space={3} justifyContent='center' alignItems={'center'}>
							
							<Text
								fontSize='xl'
								color='coolGray.800'
								bold
							>
								{item.reference}
							</Text>
					
						<Spacer />
						<Text
							fontSize='lg'
							textAlign={'center'}
							_dark={{
								color: "warmGray.50",
							}}
							color='coolGray.800'
						>
							{item.prix} GNF
						</Text>
					</VStack>
					</Pressable>
					</Box>
				)}
				keyExtractor={(item) => item.id}
			/>
		</Box>
	);
}
