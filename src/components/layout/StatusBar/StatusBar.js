import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar as SBar } from 'expo-status-bar'

export default function StatusBar(props) {
    const insets = useSafeAreaInsets()

    return (
        <View>
            <View style={{height: insets.top, backgroundColor: "#252629"}}/>
            <SBar style="light" />
        </View>
    )
}