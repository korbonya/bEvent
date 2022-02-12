import React, {useState} from 'react'
import { TextInput } from "react-native-paper";

export const InputText = ({ label, onChangeText, value }) => {
	return (
		<TextInput
			mode='outlined'
			label={label}
			value={value}
			activeOutlineColor={"#2186EB"}
			onChangeText={onChangeText}
		/>
	);
};

export const InputPass = ({ label, onChangeText, value }) => {
	const [show, setShow] = useState(true)
	return (
		<TextInput
			mode='outlined'
			label={label}
			value={value}
			onChangeText={onChangeText}
		
			activeOutlineColor={"#2186EB"}
			secureTextEntry={show}
			right={<TextInput.Icon onPress={()=>setShow(!show)}  name='eye' />}
		/>
	);
};

