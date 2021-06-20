import React from "react";
import { View, ScrollView, Image } from "react-native";

import { style } from "./Transactions.style";
import { Module, Header, Text, Divider, Break } from "../../../layout";
import { prettifyNum } from "../../../helper/prettifyNum";
import { monthFormat, dayFormat } from "../../../helper/dateFormat";
import { shortenName } from '../../../helper/shortenName';

import BankIcon from "../../../../assets/bank-icon.png";

export default function Transactions(props) {
    const titleMap = {
        liquid: "Debit",
        credit: "Credit",
        loan: "Loan",
    };

    /**
     * Renders the transactions
     */
    const renderTransactions = () => {
        let transactionsByMonth = {};

        // loop through transactions and organize them by month
        props.account.transactions.forEach((transaction) => {
            let month = transaction.date.substring(5);
            if (transactionsByMonth[month]) {
                transactionsByMonth[month].push(transaction);
            } else {
                transactionsByMonth[month] = [transaction];
            }
        });

        let mindex = 0;
        return Object.keys(transactionsByMonth).map((month) => {
            mindex++;
            let tindex = 0;
            return (
                <Module.Div>
                    <Text header subtitle>
                        {monthFormat(transactionsByMonth[month][0].date)}
                    </Text>
                    <Module.Sub>
                        {transactionsByMonth[month].map((transaction) => {
                            tindex++;
                            return (
                                <View>
                                    <View style={style.transaction}>
                                        <View>
                                            <Text>
                                                {transaction.merchant_name
                                                    .length
                                                    ? shortenName(transaction.merchant_name)
                                                    : shortenName(transaction.name)}
                                            </Text>
                                            <Text subtitle>
                                                {dayFormat(transaction.date)}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text
                                                title
                                                style={style.transactionText}
                                            >
                                                Category
                                            </Text>
                                            <Text style={style.transactionText}>
                                                {transaction.category[0] !==
                                                "Payment"
                                                    ? "+"
                                                    : "-"}
                                                $
                                                {prettifyNum(
                                                    Math.abs(transaction.amount)
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                    {tindex !==
                                    transactionsByMonth[month].length ? (
                                        <Divider sub />
                                    ) : null}
                                </View>
                            );
                        })}
                    </Module.Sub>
                    {mindex !== Object.keys(transactionsByMonth).length ? (
                        <Break />
                    ) : null}
                </Module.Div>
            );
        });
    };

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
                style={{ minWidth: "100%" }}
                contentContainerStyle={{ alignItems: "center" }}
            >
                <Module>
                    <View style={style.info}>
                        <View>
                            <Text header title>
                                Account
                            </Text>
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
                            <Image
                                source={BankIcon}
                                style={{
                                    height: 40,
                                    width: 40,
                                    marginRight: 10,
                                }}
                            />
                            <Text header subtitle>
                                {props.account.institution} •{" "}
                                {props.account.mask}
                            </Text>
                        </View>
                    </View>
                </Module>
                <Module key={Math.random()}>
                    <Text header title>
                        Transactions
                    </Text>
                    <Break />
                    {renderTransactions()}
                </Module>
            </ScrollView>
        </View>
    );
}
