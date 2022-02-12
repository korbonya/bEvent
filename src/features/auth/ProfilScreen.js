import React, {useEffect} from 'react'
import {Box,Center, Heading,Spinner, Text, Avatar, Button } from 'native-base'
import { useGetProfilQuery, useLogoutMutation } from './authApi'
import { deleteUser } from '../../common/utils/secureStore'

export default function ProfilScreen() {
    const [logout, {data:response, isSuccess:successLogout, error:logoutError, isLoading:loadLogout}] = useLogoutMutation()
    const {data, isSuccess, isLoading,error , isError} = useGetProfilQuery()
    const handleLogout = async () => {
        await logout()
        await deleteUser()
    }
    // useEffect(async ()=>{
	// 	if(error){
	// 	  await deleteUser()
	// 	  navigation.navigate('Login')
	// 	}
	//   },[error])

    // console.log('the user data is on profile ', data)
    console.log('the response of getprofile', data)
    console.log('profile load :', isLoading)
    console.log('profile success', isSuccess)
    console.log('the error ',error)
    return (
      <>
        {isLoading?(<Box flex={1} justifyContent={'center'} alignItems={'center'} >
    <Spinner accessibilityLabel="Chargement" /></Box>):( <Box bgColor={'coolGray.50'} flex={'1'} justifyContent={'center'} alignItems='center'>
            <Avatar size="120px" source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU" }} />
            <Heading my={'5'}>
                {data?.nom}
            </Heading>
            <Text fontSize={'lg'}>mamadoualiou@gmail.com</Text>
            <Text fontSize={'lg'}> +224 622 30 12 45</Text>
            <Text py='2' fontSize={'lg'}>Cosa Tannerie</Text>
            <Button size={'lg'} variant={'outline'} my={'10'}>Modifier votre profil</Button>
            <Button onPress={handleLogout} variant={'subtle'} colorScheme='danger'>Se déconnecter</Button>
        </Box>)}
      </>
    )
}
