import React from 'react'
import {Box, Heading, Text, Avatar, Button } from 'native-base'


export default function ProfilScreen() {
    return (
        <Box bgColor={'coolGray.50'} flex={'1'} justifyContent={'center'} alignItems='center'>
            <Avatar size="120px" source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU" }} />
            <Heading my={'5'}>
                Mamaodu Aliou Barry
            </Heading>
            <Text fontSize={'lg'}>mamadoualiou@gmail.com</Text>
            <Text fontSize={'lg'}> +224 622 30 12 45</Text>
            <Text py='2' fontSize={'lg'}>Cosa Tannerie</Text>
            <Button size={'lg'} variant={'outline'} my={'10'}>Modifier votre profil</Button>
        </Box>
    )
}
