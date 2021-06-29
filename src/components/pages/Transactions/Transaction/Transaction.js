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

    return (
        <View style={style.module}>
            <View>
                <Text subtitle>{dayFormat(props.transaction.date)}</Text>
                <Text>{renderName()}</Text>
            </View>
            <View>
                <Text title style={style.category}>
                    Category
                </Text>
                <Text style={style.transfer}>{prettifyNum(-props.transaction.amount)}</Text>
            </View>
        </View>
    );
}
