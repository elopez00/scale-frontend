import React from "react";
import { View, Text } from "react-native";

import { style } from "./Label.style";

export default function Label(props) {
    return (
        <View {...props}>
            <Text style={style.label}>{props.label}</Text>
            {props.children}
        </View>
    );
}
