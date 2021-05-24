import React from 'react'
import { TextInput as CTextInput } from 'react-native'
import { style } from './TextInput.style'

export default function TextInput(props) {
    return (
        <CTextInput { ...props } placeholderTextColor="#d6d6d6" style={ style.textinput }/>
    )
}