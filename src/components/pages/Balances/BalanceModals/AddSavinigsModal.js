import React from 'react'
import { Modal, Dropdown } from '../../../layout'

export default function AddSavingsModal(props) {
    return (
        <Modal showModal={props.showModal} onClose={props.onClose}>
            <Modal.Title>Want to Save?</Modal.Title>
            <Modal.Description>
                When you add to savings, no money is transferred anywhere, 
                it is just subtracted from your net-worth on the application. 
                This is just a way to visualize your money. If at the end of 
                the month you spend more than your budget, it will be subtracted.
            </Modal.Description>
            <Modal.TextInput label="Savings Name" placeholder="New Computer" />
            <Modal.TextInput label="Initial Amount" placeholder="$100" />
            <Modal.Dropdown placeholder="Select" label="Subtract from Account">
                <Dropdown.Item>Select</Dropdown.Item>
                {props.debitAccounts?.map(account => <Dropdown.Item>{account.name}</Dropdown.Item>)}
            </Modal.Dropdown>
            <Modal.Button>Add Savings</Modal.Button>
        </Modal>
    )
}