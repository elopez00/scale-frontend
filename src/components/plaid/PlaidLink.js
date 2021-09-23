import React from 'react'
import Link from '@burstware/expo-plaid-link'
import { Modal } from '../layout'

export default function PlaidLink(props) {
    /**
     * Calls token exchange API
     * @param success response from plaid link process
     */
    exchangePublicToken = async (success) => {
        let settings = {
            body: JSON.stringify({value: props.linkToken}),
            method: props.update ? "PUT" : "POST",
            credentials: "include",
            headers: new Headers({ "content-type": "application/json" })
        };

        let raw = await fetch("http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0/token/exchange", settings);
        let res = await raw.json();


    }

    return (
        <Modal overrideClose style={{height: "80%", width: "90%", paddingTop: 0, paddingBottom: 0}}>
            <Link 
                linkToken={props.linkToken}
                onSuccess={success => console.log(success.publicToken)}
                onExit={() => console.log("Exit link")}
            />
        </Modal>
    )
}