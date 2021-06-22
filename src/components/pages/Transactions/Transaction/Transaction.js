import React from "react";

import { View } from "react-native";
import { Text } from "../../../layout";

import { style } from "./Transaction.style";

import { shortenName, prettifyNum, dayFormat } from "../../../helper";

export default function Transaction(props) {
    /**
     * Gets the transaction names from props and returns a render ready
     * string using the shortenName helper function
     *
     * @returns {String} render ready string
     */
    const renderName = () => {
        const { transaction } = props;

        if (transaction.merchant_name.length) {
            return shortenName(transaction.merchant_name);
        } else {
            return shortenName(transaction.name);
        }
    };

    /**
     * Gets the transaction amount from props and returns a text element
     * reflecting a positive or negative transaction
     *
     * @returns {Component} text element containing transaction amount
     */
    const renderTransactionAmount = () => {
        const { transaction } = props;

        // the first element of the category prop in transaction will always
        // return the transaction type.
        if (transaction.amount < 0) {
            return <Text style={style.payment}>-${prettifyNum(transaction.amount)}</Text>;
        } else {
            return <Text style={style.transfer}>+${prettifyNum(transaction.amount)}</Text>;
        }
    };

    return (
        <View style={style.module}>
            <View>
                <Text>{renderName()}</Text>
                <Text subtitle>{dayFormat(props.transaction.date)}</Text>
            </View>
            <View>
                <Text title style={style.category}>
                    Category
                </Text>
                {renderTransactionAmount()}
            </View>
        </View>
    );
}
