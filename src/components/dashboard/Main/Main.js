import React from "react";
import { View, Image, Text } from "react-native";

import { style } from "./Main.style";
import Logo from '../../../assets/scale-logo.png'

import Balances from './Balances'

export default function Main(props) {
    return (
        <View style={style.module}>
            <Image source={Logo} style={style.logo}/>
            <Balances balances={props.balances} setPage={props.setPage}/>
        </View>
    );
}
