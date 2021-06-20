import React from 'react'
import { View } from 'react-native'
import { style } from './Divider.style'

export default function Divider(props) {
    return (
        <View {...props} style={props.sub ? style.sub : style.divider} />
    )
}