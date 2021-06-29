import React from "react";

import { style } from "./Account.style";
import BankIcon from "../../../../assets/bank-icon.png";

import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../../../layout";

import { prettifyNum } from "../../../helper";

export default function Account(props) {
    /**
     * Press handler to view account transactions
     *
     * @param {Object} account account object from props
     */
    const accountPress = () => {
        const { setPage, setAccount, account } = props;

        setAccount(account);
        setPage("transactions");
    };

    return (
        <TouchableOpacity elevation={1} onPress={() => accountPress()} {...props} style={{...props.style, zIndex: 1}}>
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
                <Text style={style.subtext}>
                    {prettifyNum(props.account.current)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
