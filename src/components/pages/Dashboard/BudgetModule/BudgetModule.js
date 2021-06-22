import React from 'react'
import { View, Text } from 'react-native'

import { style } from '../Dashbaord.style'

export default function BudgetModule(props) {
    return (
        <View style={style.subModule}>
            <Text style={style.header}>Budget</Text>
        </View>
    )
}