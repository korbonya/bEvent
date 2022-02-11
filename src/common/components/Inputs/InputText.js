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
	return (
		<TextInput
			mode='outlined'
			label={label}
			value={value}
			onChangeText={onChangeText}
			activeOutlineColor={"#2186EB"}
			secureTextEntry
			right={<TextInput.Icon name='eye' />}
		/>
	);
};

