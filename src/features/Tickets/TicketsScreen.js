import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

import {
  Box,
  Text,
  Pressable,
  Heading,
  ScrollView,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import AppBar2 from '../../common/components/headers/AppBar2';
import { useGetTicketsQuery } from './ticketApi';

export default function TicketsScreen({navigation}) {
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: 'Afreen Khan',
      timeStamp: '12:47 PM',
      recentText: 'Good Day!',
      avatarUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fullName: 'Sujita Mathur',
      timeStamp: '11:11 PM',
      recentText: 'Cheer up, there!',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fullName: 'Anci Barroco',
      timeStamp: '6:22 PM',
      recentText: 'Good Day!',
      avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      fullName: 'Aniket Kumar',
      timeStamp: '8:56 PM',
      recentText: 'All the best',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    }, 
  ];
  const {data:tickets, isLoading, isSuccess} = useGetTicketsQuery()
  const [listData, setListData] = useState(data);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box key={index} shadow={'0'} bgColor={'coolGray.50'} my='2' borderRadius='lg'>
				<Pressable onPress={() => navigation.push('DetailTicket', {data:item})}>
					<Box pl='4' pr='5' py='2'>
						<HStack pr={'2'} space={3}>
							{/* <Avatar size="48px" source={{ uri: item.avatarUrl }} /> */}
							<VStack>
								<Text
									color='coolGray.800'
									_dark={{ color: "warmGray.50" }}
									bold
								>
									{item?.type}
								</Text>
								<Text color='primary.700' bold fontSize='lg' _dark={{ color: "warmGray.200" }}>
									{item.evenement}
								</Text>
                                <Text mt={'4'} >Date:</Text>
								<Text bold>{item.date}</Text>
							</VStack>
							<Spacer />
							<VStack >
								<Text
									fontSize='xs'
									color='coolGray.800'
									_dark={{ color: "warmGray.50" }}
									alignSelf='flex-start'
								>
									Prix
								</Text>
								<Text bold fontSize={'md'}>{(item?.montant) + " GNF"}</Text>
                                {/* <Button variant={'outline'} mt={'4'}>Carte</Button> */}
							</VStack>
						</HStack>
					</Box>
				</Pressable>
			</Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack  my='2' flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            Plus
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Suprimer
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
   <>
   <AppBar2 title='Mes Tickets' />
     <Box px='2' bg="white" safeArea flex="1">
      <SwipeListView
        data={tickets}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
   </>
  );
}
