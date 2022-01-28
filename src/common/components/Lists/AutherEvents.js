import React from "react";
import {
	Box,
	HStack,
	VStack,
	Text,
    Image,
	Pressable
} from "native-base";
import { dformat } from "../../utils/dFormat";

export default function AutherEvents({data, navigation}) {

	return (
		<Box
			w={{
				base: "100%",
				md: "25%",
			}}
		>
            {data?.map((item) => 
                	<Box
                    key={item.id}
					bgColor='coolGray.50'
					my='2'
                    mx='2'
					shadow='3'
                >
                  <Pressable onPress={()=> navigation.push('DetailEvent', {id:item.id})}>
				  <HStack justifyContent='flex-start'>
                        <Image
                            size='120px'
                            source={{
								uri: `https://eventapp.elitegroupe.net/storage/${item.image}`,
                            }}
                            alt={item.titre}
                        />
                        <VStack pt='5' px='5'>
						<Text
                            fontSize='md'
                            _dark={{
                                color: "warmGray.50",
                            }}
                            color='coolGray.800'
                            alignSelf='flex-start'
                        >
                           {dformat(item.date_debut, 'lll')}
                        </Text>
                            <Text
								fontSize='lg'
                                _dark={{
                                    color: "warmGray.50",
                                }}
                                color='coolGray.800'
                                bold
                            >
                              {item.titre}
                            </Text>
                           
                        </VStack>
                      
                    </HStack>
				  </Pressable>
                </Box>
            )

            }
	
		</Box>
	);
}
