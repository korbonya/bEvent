import React, {useState} from 'react'
import { Box, Center, VStack, Button, Input, Heading, Text  } from 'native-base'
import {useValidationMutation, useSendCodeAgainMutation, useLoginMutation} from './authApi'

export default function ValidationScreen({route, navigation}) {
    const [validate, {isLoading, isSucces, error , isError}] = useValidationMutation()
    const [sendAgain] = useSendCodeAgainMutation()
    const [login] = useLoginMutation()
    const telephone = route.params?.telephone
    const [code, setCode] = useState(0)

    const handleSubmit = async () => {
        await validate({
            telephone,
            code
        })
        if (isSucces) {
           navigation.navigate('Login')
        }
    }
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
