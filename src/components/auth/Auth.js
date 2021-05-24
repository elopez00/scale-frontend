import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { style } from './Auth.style'

import Login from './Login'

export default function auth(props) {
    const [type, setType] = useState("login")

    const showPage = () => {
        switch(type) {
            case ("login"): return <Login setType={setType} />
        }
    }

    return (
        <View style={{...style.module }}>
            { showPage() }
        </View>
    )
}