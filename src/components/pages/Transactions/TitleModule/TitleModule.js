import React from 'react'

import { style } from './TitleModule.style'
import BankIcon from "../../../../assets/bank-icon.png";

import { View, Image } from 'react-native'
import { Text, Module, Divider, Break } from '../../../layout'

import { prettifyNum, dayFormat } from '../../../helper'


export default function TitleModule(props) {
    const renderPaymentInfo = () => {
        const { account } = props
        
        if (account?.paymentDate) {
            return (
                <View>
                    <Divider />
                    <Text header title>Next Payment</Text>
                    <View style={style.account}>
                        <View>
                            <Text subtitle>Amount Due</Text>
                            <Text>{prettifyNum(account.due)}</Text>
                        </View>
                        <View>
                            <Text style={style.subtext} subtitle>Due date</Text>
                            <Text style={style.subtext}>{dayFormat(account.paymentDate)}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
    return (
        <Module>
            <Text header title>Account</Text>
            <Break />
            <View style={style.account}>
                <View style={style.imageGroup}>
                    <Image source={BankIcon} style={style.bankIcon} />
                    <View style={style.textGroup}>
                        <Text>{props.account.name}</Text>
                        <Text subtitle>
                            {`${props.account.institution} • ${props.account.mask}`}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text title style={style.subtext}>Balance</Text>
                    <Text style={style.subtext}>
                        {prettifyNum(props.account.current)}
                    </Text>
                </View>
            </View>
            { renderPaymentInfo() }
        </Module>
    )
}