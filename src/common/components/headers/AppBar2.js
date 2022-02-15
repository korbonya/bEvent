import React from "react";
import { VStack, HStack, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, StatusBar } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

export default function AppBar2({title, navigation, back=true}){
  return (
    <>
        <StatusBar backgroundColor="#0825dd" barStyle="light-content" />

        <Box pt='5' safeAreaTop backgroundColor="primary.500" />

        <HStack bg='primary.500' px="1" pb='5' mb={'5'} justifyContent='space-between' alignItems='center'>
            <IconButton disabled={!back} onPress={() => navigation.goBack()} icon={<Icon size="sm" as={<MaterialIcons name='arrow-back' />} color={back?'white':'primary.500'} />} />
            <Text color="white" fontSize="20" fontWeight='bold'> {title} </Text>
            {/* <IconButton icon={<Icon as={<MaterialIcons name='favorite' />} size='sm' color="white" />} /> */}
            <IconButton icon={<Icon as={<MaterialIcons name='notifications-none' />} size='sm' color="#0967D2" />} />
        </HStack>
        
    </>
  )
}

