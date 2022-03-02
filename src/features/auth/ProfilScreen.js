import React, {useEffect, useCallback} from 'react'
import {Box, Center, Heading,Spinner, ScrollView, Text, Avatar, Button } from 'native-base'
import {RefreshControl} from 'react-native'
import { useGetProfilQuery, useLogoutMutation } from './authApi'
import { deleteUser } from '../../common/utils/secureStore'
import { forceLogout } from './authSlice'
export default function ProfilScreen({navigation}) {
    const [logout, {data:response, isSuccess:successLogout, error:logoutError, isLoading:loadLogout}] = useLogoutMutation()
    const {data, isSuccess, refetch, isLoading,error , isError} = useGetProfilQuery()
    const [refreshing, setRefreshing] = React.useState(false);

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
    },[])
    const handleLogout = async () => {
        await logout()
        await deleteUser()
    }
    
    return (
      <>
        {isLoading?(<Box flex={1} justifyContent={'center'} alignItems={'center'} >
    <Spinner accessibilityLabel="Chargement" /></Box>):( 
      <ScrollView
    _contentContainerStyle={{
      justifyContent:'center',
      alignItems:'center',
      pt:'10'
    }}
 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
         <Box  flex={'1'} justifyContent={'center'} alignItems='center'>
            <Avatar size="120px" source={{ uri: "https://duux.com/wp-content/uploads/2019/12/68824649-man-standaard-placeholder-avatar-profiel-gray-picture-ge%C3%AFsoleerd-op-witte-achtergrond-voor-uw-ontwerp-.jpg" }} />
            <Heading my={'5'}>
                {data?.prenom +" " + data?.nom}
            </Heading>
            <Text fontSize={'lg'}> {data?.email} </Text>
            <Text fontSize={'lg'}>tel: {data?.telephone}</Text>
            <Text py='2' fontSize={'lg'}>{data?.adresse}</Text>
            <Box mt={'20'} borderTopWidth={'1'} pt='5' w={'full'} borderColor={'gray.300'}  >
            <Button  size={'lg'} variant={'ghost'} >Modifier votre profil</Button>
            <Button onPress={handleLogout} variant={'link'} colorScheme='danger'>Se déconnecter</Button>
            </Box>
        </Box>
      </ScrollView>
   )}
      </>
    )
}
