import React from "react";
import { ScrollView, Image, Text } from "react-native";

import { style } from "./Main.style";
import Logo from "../../../assets/scale-logo.png";

import Balances from "./Balances";
import Budget from "./Budget";

export default function Main(props) {
    return (
        <ScrollView
            style={{ minWidth: "100%" }}
            contentContainerStyle={style.module}
        >
            <Image source={Logo} style={style.logo} />
            <Balances balances={props.balances} setPage={props.setPage} />
            <Budget setPage={props.setPage} />
        </ScrollView>
    );
}
