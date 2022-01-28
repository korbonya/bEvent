import React from "react";
import {
	Box,
	FlatList,
	VStack,
	Image,
    AspectRatio
} from "native-base";

export default function ImageCaroussel({image}) {
	const data = [
		{
			id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
			fullName: "Aafreen Khan",
			timeStamp: "12:47 PM",
			recentText: "Good Day!",
			avatarUrl:
				"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		},
	
	];
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
						borderBottomWidth='1'
						_dark={{
							borderColor: "gray.600",
						}}
						borderColor='coolGray.200'
                        mx='2'
					>
						<VStack space={3} justifyContent='space-between'>
							<Image
								size='400px'
                                h='250px'
								source={{
									uri: `https://eventapp.elitegroupe.net/storage/${image}`,
								}}
                                alt={item.fullName}
							/>
						</VStack>
					</Box>
				)}
				keyExtractor={(item) => item.id}
			/>
		</Box>
	);
}
