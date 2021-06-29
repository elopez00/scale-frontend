import React from "react";
import { TouchableOpacity } from "react-native";

import { Module, Text, Break } from "../../../layout";
import { prettifyNum } from "../../../helper/prettifyNum";

import uuid from 'react-native-uuid'

export default function BalanceModule(props) {
    const totalBal = prettifyNum(props.balances.net.total);

    const renderSeparators = () => {
        const { balances } = props;
        const types = ["liquid", "credit", "loan"];
        const typeMap = { liquid: "Debit", credit: "Credit", loan: "Loans" };
        
        return types.map(type => balances[type] && (
            <Module.TypeSeparator 
                key={uuid.v4()}
                name={typeMap[type]} 
                value={`${prettifyNum(balances.net[type])}`}
            />
        ));
    }

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.setPage("balances")}
        >
            <Module>
                <Text header title>Net Worth</Text>
                <Text header>{totalBal}</Text>
                <Break />
                <Text header title>Accounts</Text>
                { renderSeparators() }
            </Module>
        </TouchableOpacity>
    );
}
