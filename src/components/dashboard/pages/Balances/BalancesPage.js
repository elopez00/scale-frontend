import React, { Component } from 'react'
import { View, Text, ScrollView, BackHandler } from 'react-native'

import { style } from './BalancesPage.style'
import { style as pageStyle } from '../pages.style'
import { prettifyNum } from '../../../helper/prettifyNum'

class BalancesPage extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    // goes back to the main page 
    handleBack = () => {
        this.props.setPage("main")
        return true
    }

    getAccounts = type => {
        let components = []
        for (let account of balances[type]) {
            components.push(
                <View style={pageStyle.row} key={Math.random()}>
                    <Text style={pageStyle.subheader}>{account.name}</Text>
                    <Text style={pageStyle.subtext}>${prettifyNum(account.current)}</Text>
                </View>
            )
        }
        return components
    }

    render() {
        const { balances } = this.props
    
        return (
            <ScrollView style={{minWidth: "100%"}} contentContainerStyle={{alignItems: "center"}}>
                { 
                    balances.net.liquid ? (
                        <View style={{...pageStyle.subModule, marginTop: 40}}>
                            <Text style={pageStyle.header}>Cash</Text>
                            <Text style={pageStyle.body}>Accounts</Text>
                            <View style={pageStyle.break} />    
                            { this.getAccounts("liquid") }
                        </View>
                    ) : null
                }
                {
                    balances.net.credit ? (
                        <View style={{...pageStyle.subModule, marginTop: 40}}>
                            <Text style={pageStyle.header}>Credit</Text>
                            <Text style={pageStyle.body}>Accounts</Text>
                            <View style={pageStyle.break} />    
                            { this.getAccounts("credit") }
                        </View>
                    ) : null
                }
                {
                    balances.net.loan ? (
                        <View style={{...pageStyle.subModule, marginTop: 40, marginBottom: 40}}>
                            <Text style={pageStyle.header}>Loans</Text>
                            <Text style={pageStyle.body}>Accounts</Text>
                            <View style={pageStyle.break} />    
                            { this.getAccounts("loan") }
                        </View>
                    ) : null
                }
            </ScrollView>
        )
    }
}

export default BalancesPage