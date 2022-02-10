import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';

const InputText = ({onChangeText, value}) => {
    const [text, setText] = React.useState("");

    return (
        <TextInput
          mode='outlined'
          label="Telephone"
          value={text}
          activeOutlineColor={'#2186EB'}
          right={<TextInput.Affix text="/100" />}
          onChangeText={text => setText(text)}
        />
      );
}

export default InputText
