import React, { useState, useCallback, useEffect } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import {FontAwesome} from '@expo/vector-icons'
import {
  Box,
  Text,
  Pressable,
  Heading,
  ScrollView,
  Icon,
  HStack,
  Center,
  VStack,
  Spacer,
  Skeleton,
} from "native-base";
import { RefreshControl } from "react-native";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import AppBar2 from "../../common/components/headers/AppBar2";
import { useGetTicketsQuery } from "./ticketApi";
import { deleteUser } from "../../common/utils/secureStore";

export default function TicketsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: tickets,
    refetch,
    isLoading,
    isFetching,
    isSuccess,
    error,
  } = useGetTicketsQuery();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  useEffect(async ()=> {
    if(error){
      console.log(error)
      // await deleteUser()
      // dispatch(forceLogout())
    //   navigation.push('Login')
    }
  },[error])
  

  console.log("tikets", tickets);

  return (
    <>
      <AppBar2 title='Mes Tickets' navigation={navigation} back={false} />
      {isLoading || isFetching ? (
        <LoadEventV />
      ) : tickets && tickets.length === 0 ? (
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <Text fontSize={"lg"}>Aucun Ticket acheté</Text>
        </Box>
      ) : (
        tickets && (
          <Box px='2' bg='white' safeArea flex='1'>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
            >
              {tickets?.map((item, index) => (
                <Box
                  key={index}
                  shadow={"0"}
                  bgColor={"coolGray.50"}
                  my='2'
                  mx={'2'}
                  borderRadius='lg'
                >
                  <Pressable
                    onPress={() =>
                      navigation.push("DetailTicket", { data: item })
                    }
                  >
                    <Box pl='4' pr='5' py='2'>
                      <HStack pr={"2"} space={3}>
                        {/* <Avatar size="48px" source={{ uri: item.avatarUrl }} /> */}
                        <VStack>
                          
                          <Text
                            color='primary.700'
                            bold
                            fontSize='lg'
                            _dark={{ color: "warmGray.200" }}
                          >
                            {item.evenement}
                          </Text>
                          <HStack alignItems={'center'}>
                            <Icon
                            opacity={0.7}
                            fontWeight='light'
                            size={'xs'}
                            mr={'1'}
                            color='primary'
                            as={FontAwesome}
                            name='ticket'
                            />
                          <Text
                           fontSize={'md'}
                            color='coolGray.800'
                            _dark={{ color: "warmGray.50" }}
                            alignSelf='flex-start'
                          >
                          {item?.type}
                          </Text>
                          <Icon
                            opacity={0.7}
                            fontWeight='light'
                            size={'xs'}
                            ml={'8'}
                            mr={'1'}
                            color='primary'
                            as={FontAwesome}
                            name='money'
                            />
                          <Text bold fontSize={"md"}>
                            {item?.montant + " GNF"}
                          </Text>
                          {/* <Button variant={'outline'} mt={'4'}>Carte</Button> */}
                        </HStack>
                          
                          <HStack alignItems={'center'}>
                            <Icon
                              opacity={0.7}
                              fontWeight='light'
                              mr={'1'}
                              size={'xs'}
                              color='primary'
                              as={FontAwesome}
                              name='calendar'
                              />
                            <Text bold>{item.date}</Text>
                          </HStack>
                        </VStack>
                        <Spacer />
                      
                      </HStack>
                    </Box>
                  </Pressable>
                </Box>
              ))}
            </ScrollView>
          </Box>
        )
      )}
    </>
  );
}

const LoadEventV = () => {
  return (
    <Center w='100%'>
      <VStack
        my={"2"}
        w='90%'
        maxW='400'
        borderWidth='1'
        space={8}
        overflow='hidden'
        rounded='md'
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <Skeleton.Text px='4' />

        <Skeleton.Text pt={"1"} px='4' />
      </VStack>
      <VStack
        my={"2"}
        w='90%'
        maxW='400'
        borderWidth='1'
        space={8}
        overflow='hidden'
        rounded='md'
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <Skeleton.Text px='4' />

        <Skeleton.Text pt={"1"} px='4' />
      </VStack>{" "}
      <VStack
        my={"2"}
        w='90%'
        maxW='400'
        borderWidth='1'
        space={8}
        overflow='hidden'
        rounded='md'
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <Skeleton.Text px='4' />

        <Skeleton.Text pt={"1"} px='4' />
      </VStack>{" "}
    </Center>
  );
};
