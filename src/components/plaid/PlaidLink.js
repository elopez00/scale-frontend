import React from 'react'
import Link from '@burstware/expo-plaid-link'
import { Modal } from '../layout'

export default function PlaidLink(props) {
    console.log(props.linkToken)
    
    return (
        <Modal overrideClose style={{height: 600, width: 350}}>
            <Link 
                linkToken={props.linkToken}
                onSuccess={success => console.log(success.publicToken)}
                onExit={() => console.log("Exit link")}
            />
        </Modal>
    )
}