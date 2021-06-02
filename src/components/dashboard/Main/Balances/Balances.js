import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'

import { style } from '../Main.style'
import { prettifyNum } from '../../../helper/prettifyNum'

export default function Balances(props) {
    const totalBal =
        props.balances?.net?.total > 0
            ? `$${prettifyNum(props.balances.net.total)}`
            : `-$${prettifyNum(-props.balances.net.total)}`;

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => props.setPage("balances")}>
            <View style={style.subModule}>
                <Text style={style.header}>Net Worth</Text>
                <Text style={style.body}>{totalBal}</Text>
                <View style={style.break} />
                <View style={style.row}>
                    <Text style={style.subheader}>Debit</Text>
                    <Text style={style.subtext}>
                        ${prettifyNum(props.balances.net.liquid)}
                    </Text>
                </View>
                <View style={style.row}>
                    <Text style={style.subheader}>Credit</Text>
                    <Text style={style.subtext}>
                        -${prettifyNum(props.balances.net.credit)}
                    </Text>
                </View>
                <View style={style.row}>
                    <Text style={style.subheader}>Loan</Text>
                    <Text style={style.subtext}>
                        -${prettifyNum(props.balances.net.loan)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}