import React, { useEffect, useState, createContext } from "react";

import { View } from "react-native";
import { Transactions, Dashboard, Balances } from "./"
import PlaidLink from "../plaid/PlaidLink"
import Loading from '../loading/Loading'

export default function Pages(props) {
    // state 
    const [page, setPage] = useState("starting");
    const [balances, setBalances] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [account, setAccount] = useState(null);
    const [linkToken, setLinkToken] = useState("");

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
        // determine that the type of 
        if (typeof incoming.balances !== "string" && typeof incoming.transactions !== "string") {
            if (incoming.balances && incoming.transactions) {
                setBalances(incoming.balances);
                setTransactions(incoming.transactions);
                setPage("dashboard");
                return
            }
        }

        setPage("link")
        let institution;
        if (incoming.balances.length > 0) {
            institution = incoming.balances
        } else if (incoming.transactions.length > 0) {
            institution = incoming.transactions
        }

        let settings = {
            body: JSON.stringify({id: institution}),
            method: "PUT",
            credentials: "include",
            headers: new Headers({ "content-type": "application/json" }),
        };

        fetch("http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0/token/link", settings)
        .then(raw => raw.json())
        .then(res => setLinkToken(res.result))
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
        fetch(`${sdk}/transactions`)
            .then((raw) => raw.json())
            .then((res) => {
                if (res.status !== 200) {
                    console.error(res);

                }
                incoming.transactions = res?.result;
                
                loadState(incoming)
            })
            .catch((err) => console.error(err));

        // fetches balances
        fetch(`${sdk}/balances`)
            .then((raw) => raw.json())
            .then((res) => {
                if (res.status !== 200) console.error(res);
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

    return (
        <React.Fragment>
            <PlaidLink linkToken={linkToken}/>
            {pageHandler()}
        </React.Fragment>
    );
}
