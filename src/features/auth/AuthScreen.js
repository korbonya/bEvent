import React from 'react'
import { Box, Heading, Text, Button } from 'native-base'

import { LogBox } from "react-native";


LogBox.ignoreLogs(['NativeBase:']);

export default function AuthScreen({navigation}) {
    return (
        <Box px={'5'} flex={1} alignItems={'center'} justifyContent={'center'}>
            <Box pb={'10'} mb={'10'}>
            <Heading>
                Veillez-Vous Authentifier!
            </Heading>
            <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore minus ipsum quos quae nesciunt</Text>
            </Box>
            <Button onPress={() => navigation.navigate('Login')} my={'2'} w={'full'}>Se Connecter</Button>
            <Button onPress={() => navigation.navigate('Signup')} w={'full'} variant={'outline'}>Créer un compte</Button>
        </Box> 
    )
}
