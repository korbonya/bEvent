import React, {useState, useEffect} from 'react'
import { Box, Center, VStack, Button, Input, Heading, Text  } from 'native-base'
import {useValidationMutation, useSendCodeAgainMutation, useLoginMutation} from './authApi'
import { saveUser } from '../../common/utils/secureStore'

export default function ValidationScreen({route, navigation}) {
    const [validate, {data, isLoading, isSuccess}] = useValidationMutation()
    const [sendAgain] = useSendCodeAgainMutation()
    const [login, {data:userData}] = useLoginMutation()
    const {telephone, password} = route.params
    const [code, setCode] = useState("")

    useEffect(async ()=>{
        if(isSuccess){
            await login({telephone, password})
        }
    },[isSuccess])
    useEffect(async ()=> {
        if(userData){
            await saveUser(userData)
            navigation.navigate('Home')
        }
    },[])
    console.log('user Data', userData)
    const handleSubmit = async () => {
        await validate({
            telephone,
            code
        })
        if (isSucces) {
           navigation.navigate('Login')
        }
    }
    console.log('le telephone', telephone)
    console.log('the response req::', data)
    const sendCodeAgain = async () => {
        if(telephone) await sendAgain(telephone)
    }
    return (
        <Box  px={'5'} py={'5'}>
            <VStack  space={'3'}>
                  <Heading>Validation</Heading>
            <Text>confirmez votre numéro en saisissant le code qu'on vous envoyé !</Text>
            </VStack>
            <VStack space={'5'}>
            <Input keyboardType='phone-pad' value={code} onChangeText={(value) => setCode(value)} variant={'filled'} />
            <Button isLoading={isLoading} isLoadingText='Validation' onPress={handleSubmit} >Valider</Button>
            <Button  onPress={() => sendCodeAgain()} variant={'link'}>Renvoyez-moi le code</Button>
            </VStack>
        </Box>
    )
}
