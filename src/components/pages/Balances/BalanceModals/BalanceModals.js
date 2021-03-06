import React from 'react'
import AddCashModal from './AddCashModal'
import AddSavingsModal from './AddSavinigsModal';
import RemoveAccount from './RemoveAccount';

export default function BalanceModals(props) {

    /**
     * Displays the desired modal based on the showModal prop
     * 
     * @returns {Component} modal component to be displayed to DOM
     */
    const showModal = () => {
        switch(props.showType) {
        case "add-cash": return <AddCashModal showModal={props.showModal} onClose={props.onClose}/>;
        case "add-savings": return <AddSavingsModal accounts={props.accounts} showModal={props.showModal} onClose={props.onClose}/>
        default: return null;
        }
    }

    return showModal();
}