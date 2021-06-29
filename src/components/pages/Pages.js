import React, { useEffect, useState, createContext } from "react";

import { View } from "react-native";
import { Transactions, Dashboard, Balances } from "./"
import Loading from '../loading/Loading'

export default function Pages(props) {
    // state 
    const [page, setPage] = useState("starting");
    const [balances, setBalances] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [account, setAccount] = useState(null);

    // simulates componentDidMount
    useEffect(() => {
        getData();
    }, [])

    /**
     * Changes state when all the data that needs to be gathered is 
     * loaded successfully
     * 
     * @param {Object} incoming 
     */
    const loadState = (incoming) => {
        if (incoming.balances && incoming.transactions) {
            setBalances(incoming.balances);
            setTransactions(incoming.transactions);
            setPage("dashboard");
        }
    }

    /**
     * Gets required data asynchronously from the database including transactions and
     * balances
     */
    const getData = () => {
        const sdk = // sdk url
            "http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0";

        // object that keeps track of when all props are loaded
        let incoming = {
            balances: null,
            transactions: null,
        };

        // fetches transactions
        fetch(`${sdk}/transactions/get`)
            .then((raw) => raw.json())
            .then((res) => {
                if (res.status != 200) console.error(res);
                incoming.transactions = res?.result;
                
                loadState(incoming)
            })
            .catch((err) => console.error(err));

        // fetches balances
        fetch(`${sdk}/balances/get`)
            .then((raw) => raw.json())
            .then((res) => {
                if (res.status != 200) console.error(res);
                incoming.balances = res?.result;

                loadState(incoming)
            })
            .catch((err) => console.error(err));
    };

    /**
     * Determines which component to render based on the page state variable.
     * 
     * @returns {Component} Page that will display
     */
    const pageHandler = () => {
        switch(page) {
        case "dashboard": return <Dashboard {...{balances, transactions, setPage}} /> 
        case "balances": return <Balances {...{balances, transactions, setPage, setAccount}} balances={balances} />
        case "transactions": return <Transactions {...{transactions, setPage, account}} />
        default: return <Loading />;
        }
    };

    return <View>{pageHandler()}</View>;
}
