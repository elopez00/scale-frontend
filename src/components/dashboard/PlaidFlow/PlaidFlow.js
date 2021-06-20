import React from "react";
import { View, Text } from "react-native";

import { style } from "./PlaidFlow.style";
import PlaidLink from "@burstware/expo-plaid-link";

export default function PlaidFlow(props) {
    /**
     * On Success callback function for the Plaid Link user interface. It will return a link success
     * object that will yield the public token and exchange it for a permanent token stored in the
     * database
     *
     * @param {Object} linkSuccess
     */
    const onSuccess = async (linkSuccess) => {
        try {
            let raw = await fetch(
                "http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0/exchangePublicToken",
                {
                    body: JSON.stringify({ value: linkSuccess.publicToken, name: linkSuccess.institution.name }),
                    method: "post",
                    headers: { "content-type": "application/json" },
                }
            );

            let res = await raw.json();
            if (res.status !== 200) {
                console.log(res);
                return;
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={style.module}>
            <PlaidLink
                linkToken={props.linkToken}
                onSuccess={(success) => onSuccess(success)}
                onError={(error) => null}
                onEvent={(event) => null}
                onExit={() => props.setPage("getting-started")}
            />
        </View>
    );
}
