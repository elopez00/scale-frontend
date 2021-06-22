import React from "react";

import { ScrollView, Image, Text } from "react-native";
import { BalanceModule, BudgetModule } from './'

import { style } from "./Dashbaord.style";
import Logo from "../../../assets/scale-logo.png";

export default function Main(props) {
    return (
        <ScrollView
            style={{ minWidth: "100%" }}
            contentContainerStyle={style.module}
        >
            <Image source={Logo} style={style.logo} />
            <BalanceModule balances={props.balances} setPage={props.setPage} />
            <BudgetModule setPage={props.setPage} />
        </ScrollView>
    );
}
