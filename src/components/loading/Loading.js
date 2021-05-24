import React, { useEffect, useState } from 'react'
import { View, Image, Text } from 'react-native'

import logo from '../../../assets/icon.png'
import { style } from './Loading.style'

export default function Loading(props) {
    return (
        <View style={style.module}>
            <Image style={ style.loadingCircle } source={ logo } />
            <Text style={ style.text }>Loading</Text>
        </View>
    )
}