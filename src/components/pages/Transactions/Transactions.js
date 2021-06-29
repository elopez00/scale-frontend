import React, {useEffect} from "react";

import { style } from './Transaction.style'
import { View, ScrollView, BackHandler } from "react-native";
import { Module, Header, Text, Break } from "../../layout";
import { Transaction, TitleModule } from './'

import { monthFormat, renderBreak, renderSubDivider } from "../../helper";
import uuid from 'react-native-uuid'

export default function Transactions(props) {
    useEffect(() => {
        addBack();
        return removeBack;
    },[])

    /**
     * Adds back handler listener 
     */
    const addBack = () => BackHandler.addEventListener("hardwareBackPress", handleBack);

    /**
     *  Removes back handler listener
     */
    const removeBack = () => BackHandler.removeEventListener("hardwareBackPress", handleBack);

    /**
     * Back handler function
     *
     * @returns {Bool}
     */
    const handleBack = () => {
        const { setPage } = props;

        setPage("balances");
        return true;
    };

    /**
     * Renders all the transactions from the transaction prop
     *
     * @param {Array} transactions all transaction elements of the month
     * @returns {Array} render ready list of components
     */
    const renderTransactions = (transactions) => {
        const last = transactions.length - 1; // last transaction element

        return transactions.map((transaction, index) => (
            <View key={uuid.v4()}>
                {<Transaction transaction={transaction} />}
                {renderSubDivider(index, last)}
            </View>
        ));
    };

    /**
     * Renders all the transactions separated into month sub modules.
     *
     * @returns {Array} render ready list of components
     */
    const renderTransactionMonth = () => {
        const { account } = props;
        let transactions = {}; // object of transactions by month

        // loop through transactions and organize them by month
        account.transactions?.forEach((transaction) => {
            let month = transaction.date.substring(0, 7);
            if (transactions[month]) {
                transactions[month].push(transaction);
            } else {
                transactions[month] = [transaction];
            }
        });

        // last month rendered
        const last = Object.keys(transactions).length - 1;

        return Object.keys(transactions)?.map((month, index) => (
            <Module.Div key={uuid.v4()}>
                <Text header subtitle>
                    {monthFormat(transactions[month][0].date)}
                </Text>
                <Module.Sub>
                    {renderTransactions(transactions[month])}
                </Module.Sub>
                {renderBreak(index, last)}
            </Module.Div>
        ));
    };

    const renderTransactionModule = () => {
        const { account } = props;

        if (account.transactions) {
            return (
                <Module>
                    <Text header title>Transactions</Text>
                    <Break />
                    {renderTransactionMonth()}
                </Module>
            )
        }

        return (
            <Text subtext>No transactions here</Text>
        )
    }

    return (
        <View>
            <Header>
                <Header.Button
                    icon="keyboard-arrow-left"
                    onPress={() => props.setPage("balances")}
                />
                <Header.Title>Transactions</Header.Title>
                <Header.Placeholder />
            </Header>
            <ScrollView
                style={style.scroll}
                contentContainerStyle={style.scrollContent}
            >
                <TitleModule account={props.account}/>
                { renderTransactionModule() }
            </ScrollView>
        </View>
    );
}
