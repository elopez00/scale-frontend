import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { style } from './IconButton.style'

export default function IconButton(props) {
    return (
        <TouchableOpacity {...props}>
            <MaterialIcons name={props.icon} style={{...style.icon, ...props.style}}/>
        </TouchableOpacity>
    )
}