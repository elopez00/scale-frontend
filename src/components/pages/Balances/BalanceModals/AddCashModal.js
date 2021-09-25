import React, {useState} from 'react'
import {Modal, Dropdown} from '../../../layout'
import uuid from 'react-native-uuid'

export default function AddCashModal(props) {
    const [item, setItem ] = useState("Every Week");

    return (
        <Modal showModal={props.showModal} onClose={props.onClose}>
            <Modal.Title>Got Cash?</Modal.Title>
            <Modal.TextInput placeholder="$100" label="Add Amount" />
            <Modal.Dropdown label="Want a Reminder?" placeholder={item}>
                <Dropdown.Item onPress={() => setItem("Every day")}>Every day</Dropdown.Item>
                <Dropdown.Item onPress={() => setItem("Every month")}>Every month</Dropdown.Item>
                <Dropdown.Item onPress={() => setItem("Every Week")}>Every Week</Dropdown.Item>
            </Modal.Dropdown>
            <Modal.Button>Add the cash</Modal.Button>
        </Modal>
    )
} 