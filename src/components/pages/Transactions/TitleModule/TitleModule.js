import React from 'react'

import { style } from './TitleModule.style'
import BankIcon from "../../../../assets/bank-icon.png";

import { View, Image } from 'react-native'
import { Text, Module, Divider } from '../../../layout'

import { prettifyNum } from '../../../helper'


export default function TitleModule(props) {
    // converts the backend values to frontend formateed
    const titleMap = {
        liquid: "Debit",
        credit: "Credit",
        loan: "Loan",
    };

    return (
        <Module>
            <View style={style.info}>
                <View>
                    <Text header title>Account</Text>
                    <Text header>
                        ${prettifyNum(props.account.current)}
                    </Text>
                </View>
                <View>
                    <Text title style={style.bodyTitle}>
                        {titleMap[props.account.type]}
                    </Text>
                    <Text>{props.account.name}</Text>
                </View>
            </View>
            <View>
                <Divider />
                <View style={style.bank}>
                    <Image source={BankIcon} style={style.bankIcon} />
                    <Text header subtitle>
                        {props.account.institution} •{" "}
                        {props.account.mask}
                    </Text>
                </View>
            </View>
        </Module>
    )
}