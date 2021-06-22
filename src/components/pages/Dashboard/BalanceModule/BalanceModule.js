import React from "react";
import { View, TouchableOpacity } from "react-native";

import { Module, Text } from "../../../layout";
import { style } from "../Dashbaord.style";
import { prettifyNum } from "../../../helper/prettifyNum";

export default function BalanceModule(props) {
    const totalBal =
        props.balances?.net?.total > 0
            ? `$${prettifyNum(props.balances.net.total)}`
            : `-$${prettifyNum(-props.balances.net.total)}`;

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.setPage("balances")}
        >
            <Module>
                <Text header title>
                    Net Worth
                </Text>
                <Text header>{totalBal}</Text>
                <View style={style.break} />
                <Text header title>
                    Balances
                </Text>
                <Module.TypeSeparator
                    name="Debit"
                    value={`$${prettifyNum(props.balances.net.liquid)}`}
                />
                <Module.TypeSeparator
                    name="Credit"
                    value={`-$${prettifyNum(props.balances.net.credit)}`}
                />
                <Module.TypeSeparator
                    name="Loans"
                    value={`-$${prettifyNum(props.balances.net.loan)}`}
                />
            </Module>
        </TouchableOpacity>
    );
}
