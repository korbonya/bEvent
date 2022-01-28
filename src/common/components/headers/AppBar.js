import React from "react";
import { VStack, HStack, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, StatusBar } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

export default function AppBar(){
  return (
    <>
        <StatusBar backgroundColor="#002159" barStyle="light-content" />

        <Box safeAreaTop backgroundColor="primary.500" />

        <HStack bg='primary.500' px="1" py="3" justifyContent='space-between' alignItems='center'>
          <HStack space="10" alignItems='center'>
            <IconButton icon={<Icon size="sm" as={<MaterialIcons name='menu' />} color="white" />} />
            <Text color="white" fontSize="20" fontWeight='bold'>B-Event</Text>
          </HStack>
          <HStack space="2">
            {/* <IconButton icon={<Icon as={<MaterialIcons name='favorite' />} size='sm' color="white" />} /> */}
            <IconButton icon={<Icon as={<MaterialIcons name='search' />}
            color="white" size='sm'  />} />
            <IconButton icon={<Icon as={<MaterialIcons name='notifications' />} size='sm' color="white" />} />
          </HStack>
        </HStack>

    </>
  )
}

