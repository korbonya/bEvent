import React from "react";
import { VStack, HStack, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, StatusBar } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

export default function AppBar2({title, navigation}){
  return (
    <>
        <StatusBar backgroundColor="#0967D2" barStyle="light-content" />

        <Box pt='5' safeAreaTop backgroundColor="primary.500" />

        <HStack bg='primary.500' px="1" pb='12' justifyContent='space-between' alignItems='center'>
            <IconButton onPress={() => navigation.goBack()} icon={<Icon size="sm" as={<MaterialIcons name='arrow-back' />} color="white" />} />
            <Text color="white" fontSize="20" fontWeight='bold'> {title} </Text>
            {/* <IconButton icon={<Icon as={<MaterialIcons name='favorite' />} size='sm' color="white" />} /> */}
            <IconButton icon={<Icon as={<MaterialIcons name='notifications-none' />} size='sm' color="#0967D2" />} />
        </HStack>
        
    </>
  )
}

