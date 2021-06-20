import React from 'react'
import { View, Text } from 'react-native'

import { style } from '../Main.style'

export default function Budget(props) {
    return (
        <View style={style.subModule}>
            <Text style={style.header}>Budget</Text>
        </View>
    )
}