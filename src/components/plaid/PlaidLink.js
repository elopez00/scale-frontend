import React, { useState, useEffect } from 'react'
import Link from '@burstware/expo-plaid-link'
import { Modal } from '../layout'
import { style } from './PlaidLink.style';

export default function PlaidLink(props) {
    const [initialized, initialize] = useState(false);
    const [linkToken, setLinkToken] = useState("");

    useEffect(() => {
        if (!initialized && props.showLink) {
            if (props.linkToken) {
                setLinkToken(props.linkToken);
                initialize(true);
            } else {
                getLinkToken();
            }
        }
    })

    /**
     * Get the link token from backend and then use it. Used when there was no link token
     * passed through the properties 
     */
    const getLinkToken = async () => {
        try {
            // get link token
            let raw = await fetch(
                "http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0/token/link"
            );

            // convert the raw response into json
            let res = await raw.json();
            if (res.status !== 200) {
                console.log(res);
                return;
            }

            // set tokens
            setLinkToken(res.result);
            initialize(true);
            console.log(res.message);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Calls token exchange API
     * @param success response from plaid link process
     */
    const exchangePublicToken = async (success) => {
        let settings = {
            body: JSON.stringify({value: success.publicToken}),
            method: props.linkToken.length ? "POST" : "PUT",
            credentials: "include",
            headers: new Headers({ "content-type": "application/json" })
        };

        try {
            let raw = await fetch("http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0/token/exchange", settings);
            let res = await raw.json();
            if (res.status !== 200) {
                console.log(res.message);
                return;
            }
        } catch(err) {
            console.error(err)
        }

    }

    /**
     * Closes the link and reinitiates the link
     */
    const closeLink = () => {
        setLinkToken("");
        initialize(false);
        props.onClose();
    }

    return (
        <Modal overrideClose showModal={props.showLink} style={style.modal}>
            {linkToken?.length ? (
                <Link 
                    linkToken={linkToken}
                    onSuccess={success => exchangePublicToken(success)}
                    onError={err => console.log(err)}
                    onExit={closeLink}
                />) : null}
        </Modal>
    )
}