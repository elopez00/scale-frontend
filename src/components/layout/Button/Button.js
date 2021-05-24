import React from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";

import { style } from "./Button.style";

export default function Button(props) {
    return (
        <Animated.View>
            <TouchableOpacity
                activeOpacity={0.8}
                underlayColor="#b83930"
                {...props}
            >
                <View style={{...style.button, ...props.style}}>
                    {props.view ? (
                        <View>{props.children}</View>
                    ) : (
                        <Text style={style.text}>{props.children}</Text>
                    )}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}
