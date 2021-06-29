import React from "react";
import { View, Text } from "react-native";

import { style } from "./Label.style";

export default function Label(props) {
    const renderLabel = () => {
        const { opp, label } = props;

        if (opp) {
            return <Text style={style.opp}>{label}</Text>
        }
        
        return <Text style={style.label}>{label}</Text>
    }
    return (
        <View {...props}>
            {renderLabel()}
            {props.children}
        </View>
    );
}
