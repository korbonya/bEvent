import React from 'react'
import {Box,Center, Heading, Text, Avatar, Button } from 'native-base'
import { useGetProfilQuery, useLogoutMutation } from './authApi'
import { deleteUser } from '../../common/utils/secureStore'

export default function ProfilScreen() {
    const [logout, {data:response, isLoading:loadLogout}] = useLogoutMutation()
    const {data, isSuccess, isLoading,error , isError} = useGetProfilQuery()
    const handleLogout = async () => {
        await deleteUser()
        await logout()
    }

    console.log('the user data is on profile ', data)
    console.log('is loading ', isLoading)
    console.log('the response of logout', response)
    console.log('logout load :', loadLogout)
    return (
      <>
        {isLoading?(<Box>
            <Center>
                <Heading>Chargement..</Heading>
            </Center>
        </Box>):( <Box bgColor={'coolGray.50'} flex={'1'} justifyContent={'center'} alignItems='center'>
            <Avatar size="120px" source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU" }} />
            <Heading my={'5'}>
                {data?.nom}
            </Heading>
            <Text fontSize={'lg'}>mamadoualiou@gmail.com</Text>
            <Text fontSize={'lg'}> +224 622 30 12 45</Text>
            <Text py='2' fontSize={'lg'}>Cosa Tannerie</Text>
            <Button size={'lg'} variant={'outline'} my={'10'}>Modifier votre profil</Button>
            <Button onPress={()=>handleLogout()} variant={'subtle'} colorScheme='danger'>Se déconnecter</Button>
        </Box>)}
      </>
    )
}
