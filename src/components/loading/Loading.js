import React, { useEffect, useState } from 'react'
import { View, Image, Text, ActivityIndicator } from 'react-native'

import logo from '../../assets/scale-logo.png'
import { style } from './Loading.style'

export default function Loading(props) {
    return (
        <View style={style.module}>
            <Image style={ style.loadingCircle } source={ logo } />
            <View style={ style.loading }>
                <ActivityIndicator color="white" size="large"/>
            </View>
        </View>
    )
}