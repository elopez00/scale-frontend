import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

import { style } from "./Dashboard.style";
import { MaterialIcons } from "@expo/vector-icons";
import Loading from "../loading";
import { Button } from "../layout";

import { BalancesPage } from "./pages";
import PlaidFlow from "./PlaidFlow";
import Main from "./Main";

export default function Dashboard(props) {
    // state
    const [balances, setBalances] = useState(null);
    const [page, setPage] = useState("loading");

    /**
     * Gets all Balances from all bank accounts relating to the user and stores it in the transaction
     * state variable
     */
    const getBalances = async () => {
        try {
            let raw = await fetch(
                "http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0/getBalances"
            );

            let res = await raw.json();
            if (res.status !== 200) {
                console.log(res);
                setPage("get-started");
                return;
            }

            setBalances(res.result);
            setPage("main");
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * The component handler will show which page the user will see once they are authenticated
     * by the server
     *
     * @returns {Component} component containing what view the user will see once authenticated
     */
    const componentHandler = () => {
        const GetStarted = (
            <View style={style.getStarted}>
                <MaterialIcons name="search" size={60} color="white" />
                <Text style={style.text}>Looks like you aren't set up yet</Text>
                <Button onPress={() => setPage("plaid-link")}>
                    Get started
                </Button>
            </View>
        );

        switch (page) {
            case "plaid-link":
                return (
                    <PlaidFlow setPage={setPage} linkToken={props.linkToken} />
                );
            case "main":
                return <Main balances={balances} setPage={setPage} />;
            case "get-started":
                return GetStarted;
            case "balances":
                return <BalancesPage balances={balances} setPage={setPage} />;
            default:
                return <Loading />;
        }
    };

    useEffect(() => {
        getBalances();
    }, []);

    return <View>{componentHandler()}</View>;
}
