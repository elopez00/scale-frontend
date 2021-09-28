import React from 'react'
import { Modal } from '../../../layout'

export default function(props) {
    return (
        <Modal showModal={props.showModal}>
            <Modal.Title>Delete Accounts</Modal.Title>
        </Modal>
    )
}