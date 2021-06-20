import React, { Component } from 'react'
import { View, ScrollView, BackHandler, Image, TouchableOpacity } from 'react-native'

import { style } from './BalancesPage.style'
import { prettifyNum } from '../../../helper/prettifyNum'
import { Header, Text, Module, Break, Divider } from '../../../layout'
import BankIcon from '../../../../assets/bank-icon.png'

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

    accountPress = (account) => {
        const { setPage, setAccount } = this.props;
        setAccount(account);
        setPage("transactions");
    }

    getAccounts = type => {
        const { balances } = this.props

        let components = [];
        let accounts = {}
        let index = 0;

        for (let account of balances[type]) {
            index++;
            accounts[account.id] = {
                ...account,
                transactions: this.props.transactions[account.id],
                type
            }

            components.push(
                <View key={Math.random()}>
                    <TouchableOpacity onPress={() => this.accountPress(accounts[account.id])}>
                        <View style={style.account}>
                            <View style={style.imageGroup}>
                                <Image source={BankIcon} style={{height: 40, width: 40}}/>
                                <View style={style.textGroup}>
                                    <Text>{account.name}</Text>
                                    <Text subtitle>
                                        { `Bank • 1234`}
                                    </Text>
                                </View>
                            </View>
                            <Text style={style.subtext}>${prettifyNum(account.current)}</Text>  
                        </View>
                    </TouchableOpacity>
                    { index !== balances[type].length ? <Divider /> : null }
                </View>
            )
        }
        return components
    }

    render() {
        const { balances } = this.props;
    
        return (
            <View>
                <Header>
                    <Header.Button icon="keyboard-arrow-left" onPress={this.handleBack}/>
                    <Header.Title>Balances</Header.Title>
                    <Header.Button icon="edit" right style={{fontSize: 25}} />
                </Header>
                <ScrollView style={{minWidth: "100%"}} contentContainerStyle={{alignItems: "center"}}>
                    <Module>
                        <Text header title>Debit</Text>
                        <Text header>${prettifyNum(balances.net.liquid)}</Text>
                        <Break />
                        <Text header title>Accounts</Text>
                        <Break />
                        { this.getAccounts("liquid") }
                    </Module>
                    <Module>
                        <Text header title>Credit</Text>
                        <Text header>${prettifyNum(balances.net.credit)}</Text>
                        <Break />
                        <Text header title>Accounts</Text>
                        <Break />
                        { this.getAccounts("credit") }
                    </Module>
                    <Module>
                        <Text header title>Loan</Text>
                        <Text header>${prettifyNum(balances.net.loan)}</Text>
                        <Break />
                        <Text header title>Accounts</Text>
                        <Break />
                        { this.getAccounts("loan") }
                    </Module>
                </ScrollView>
            </View>
        )
    }
}

export default BalancesPage;