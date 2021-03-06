import React, {useState} from 'react'
import { shadow, TextInput, TextInputMask } from "react-native-paper";

export const InputText = ({ label, onChangeText, value, keyboard='phone-pad' }) => {
	return (
		<TextInput
			mode='flat'
			label={label}
			value={value}
			underlineColor="#2186EB"
			keyboardType={keyboard}
			style={{
				backgroundColor:"#f3f4f6",
			}}
			activeUnderlineColor={"#2186EB"}
			onChangeText={onChangeText}
		/>
	);
};

export const InputPass = ({ label, onChangeText, value }) => {
	const [show, setShow] = useState(true)
	return (
		<TextInput
			mode='flat'
			label={label}
			value={value}
			onChangeText={onChangeText}
			underlineColor="#2186EB"
			style={{
				backgroundColor:"#f3f4f6",	
			}}
			
			activeUnderlineColor={"#2186EB"}
			
			secureTextEntry={show}
			right={<TextInput.Icon onPress={()=>setShow(!show)}  name='eye' />}
		/>
	);
};

