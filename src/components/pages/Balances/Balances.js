import React, { useEffect, useState } from "react";

import { style } from "./Balances.style";

import { View, ScrollView, BackHandler } from "react-native";
import { Header, Text, Module, Break, IconMenu, Modal, Dropdown} from "../../layout";
import Account from "./Account/Account";

import { prettifyNum, renderDivider } from "../../helper";
import uuid from "react-native-uuid";

export default function Balances(props) {
    const [item, setItem ] = useState("Every Week");
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

    return (
        <View>
            <Modal>
                <Modal.Title>Got Cash?</Modal.Title>
                <Modal.TextInput placeholder="$100" label="Add Amount" />
                <Modal.Dropdown label="Want a Reminder?" placeholder={item}>
                    <Dropdown.Item onPress={() => setItem("Every day")}>Every day</Dropdown.Item>
                    <Dropdown.Item onPress={() => setItem("Every month")}>Every month</Dropdown.Item>
                    <Dropdown.Item onPress={() => setItem("Every Week")}>Every Week</Dropdown.Item>
                </Modal.Dropdown>
            </Modal>
            <Header>
                <Header.Button
                    icon="keyboard-arrow-left"
                    onPress={handleBack}
                />
                <Header.Title>Balances</Header.Title>
                {/* <Header.Button icon="edit" right style={style.headerButton} /> */}
                <Header.Menu right icon="edit" style={{fontSize: 25}}>
                    <IconMenu.Item onPress={() => console.log("hello")}>Add Account</IconMenu.Item>
                    <IconMenu.Item onPress={() => console.log("hello")}>Add Cash</IconMenu.Item>
                    <IconMenu.Item onPress={() => console.log("hello")}>Add Savings</IconMenu.Item>
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