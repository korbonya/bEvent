import React, { useState, useCallback, useEffect } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";

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
      await deleteUser()
      dispatch(forceLogout())
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
                            color='coolGray.800'
                            _dark={{ color: "warmGray.50" }}
                            bold
                          >
                            {item?.type}
                          </Text>
                          <Text
                            color='primary.700'
                            bold
                            fontSize='lg'
                            _dark={{ color: "warmGray.200" }}
                          >
                            {item.evenement}
                          </Text>
                          <Text mt={"4"}>Date:</Text>
                          <Text bold>{item.date}</Text>
                        </VStack>
                        <Spacer />
                        <VStack>
                          <Text
                            fontSize='xs'
                            color='coolGray.800'
                            _dark={{ color: "warmGray.50" }}
                            alignSelf='flex-start'
                          >
                            Prix
                          </Text>
                          <Text bold fontSize={"md"}>
                            {item?.montant + " GNF"}
                          </Text>
                          {/* <Button variant={'outline'} mt={'4'}>Carte</Button> */}
                        </VStack>
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
