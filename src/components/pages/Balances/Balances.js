import React, { useEffect, useState } from "react";

import { style } from "./Balances.style";

import { View, ScrollView, BackHandler } from "react-native";
import { Header, Text, Module, Break, IconMenu, Modal, Dropdown} from "../../layout";
import Account from "./Account/Account";
import BalanceModals from "./BalanceModals/BalanceModals";

import { prettifyNum, renderDivider } from "../../helper";
import uuid from "react-native-uuid";

export default function Balances(props) {
    const [showModal, toggleModal] = useState(false);
    const [showType, setType] = useState("");

    useEffect(() => {
        addBack();
        
        return removeBack;
    }, [])
    
    const addBack = () => BackHandler.addEventListener("hardwareBackPress", handleBack);
    const removeBack = () => BackHandler.removeEventListener("hardwareBackPress", handleBack);

    /**
     * Back handler function
     *
     * @returns {Bool}
     */
    const handleBack = () => {
        const { setPage } = props;

        setPage("dashboard");
        return true;
    };

    /**
     * Renders all the accounts of given type directly to the DOM
     *
     * @param {String} type type of balance being searched
     * @returns {Array} render ready list of account components
     */
    const renderAccounts = (type) => {
        const { balances, transactions, setPage, setAccount } = props;
        let last = balances[type].length - 1; // index of last account
        let accounts = {}; // object containing adjusted accounts by id

        return balances[type].map((account, index) => {
            accounts[account.id] = {
                ...account,
                transactions: transactions[account.id],
                type,
            };

            return (
                <View key={uuid.v4()}>
                    <Account account={accounts[account.id]} {...{setPage, setAccount}}/>
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
    const renderBalances = () => {
        const { balances } = props;
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
                    <Text header>{prettifyNum(balances.net[type])}</Text>
                    <Break />
                    <Text header title>
                        Accounts
                    </Text>
                    <Break />
                    {renderAccounts(type)}
                </Module>
            )
        });
    };

    /**
     * Displays the modal described by the type parameter
     * 
     * @param {String} type type of modal to show on menu press 
     */
    const menuPress = type => {
        toggleModal(true);
        setType(type);
    }

    return (
        <View>
            <BalanceModals 
             showType={showType} 
             showModal={showModal} 
             onClose={() => toggleModal(false)}
             debitAccounts={props.balances.Debit}
            />
            <Header>
                <Header.Button
                    icon="keyboard-arrow-left"
                    onPress={handleBack}
                />
                <Header.Title>Balances</Header.Title>
                <Header.Menu right icon="edit" style={{fontSize: 25}}>
                    <IconMenu.Item onPress={() => props.toggleLink(true)}>Add Account</IconMenu.Item>
                    <IconMenu.Item onPress={() => menuPress("add-cash")}>Add Cash</IconMenu.Item>
                    <IconMenu.Item onPress={() => menuPress("add-savings")}>Add Savings</IconMenu.Item>
                    <IconMenu.Item onPress={() => console.log("hello")} red>Remove Account</IconMenu.Item>
                </Header.Menu>
            </Header>
            <ScrollView
                style={style.scroll}
                contentContainerStyle={style.scrollContent}
            >
                {renderBalances()}
            </ScrollView>
        </View>
    );
}