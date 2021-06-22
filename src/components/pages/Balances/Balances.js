import React, { Component } from "react";

import { style } from "./Balances.style";

import { View, ScrollView, BackHandler } from "react-native";
import { Header, Text, Module, Break } from "../../layout";
import Account from "./Account/Account";

import { prettifyNum, renderDivider } from "../../helper";
import uuid from "react-native-uuid";

class Balances extends Component {
    // Back Handler listener
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBack);
    }

    // Back Handler umount
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
    }

    /**
     * Back handler function
     *
     * @returns {Bool}
     */
    handleBack = () => {
        const { setPage } = this.props;

        setPage("main");
        return true;
    };

    /**
     * Renders all the accounts of given type directly to the DOM
     *
     * @param {String} type type of balance being searched
     * @returns {Array} render ready list of account components
     */
    renderAccounts = (type) => {
        const { balances, transactions, setPage, setAccount } = this.props;
        let index = 0; // index of account
        let last = balances[type].length; // index of last account
        let accounts = {}; // object containing adjusted accounts by id

        return balances[type].map((account) => {
            index++; // increment index
            accounts[account.id] = {
                ...account,
                transactions: transactions[account.id],
                type,
            };

            return (
                <View key={uuid.v4()}>
                    <Account account={accounts[account.id]} setPage={setPage} setAccount={setAccount}/>
                    {renderDivider(index, last)}
                </View>
            );
        });
    };

    /**
     * Renders all the balance types from the balance response
     *
     * @returns render ready list of balance components
     */
    renderBalances = () => {
        const { balances } = this.props;
        const types = ["liquid", "credit", "loan"];
        const typeMap = {
            liquid: "Debit",
            credit: "Credit",
            loan: "Loans",
        };

        return types.map((type) => {
            return balances[type] && (
                <Module key={uuid.v4()}>
                    <Text header title>
                        {typeMap[type]}
                    </Text>
                    <Text header>${prettifyNum(balances.net[type])}</Text>
                    <Break />
                    <Text header title>
                        Accounts
                    </Text>
                    <Break />
                    {this.renderAccounts(type)}
                </Module>
            )
        });
    };

    render() {
        return (
            <View>
                <Header>
                    <Header.Button
                        icon="keyboard-arrow-left"
                        onPress={this.handleBack}
                    />
                    <Header.Title>Balances</Header.Title>
                    <Header.Button icon="edit" right style={style.headerButton} />
                </Header>
                <ScrollView
                    style={style.scroll}
                    contentContainerStyle={style.scrollContent}
                >
                    {this.renderBalances()}
                </ScrollView>
            </View>
        );
    }
}

export default Balances;
