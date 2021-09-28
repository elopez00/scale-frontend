import React, { useState } from 'react'
import { View } from 'react-native'
import TextInput from '../TextInput/TextInput'

import findAll from '../../helper/findAll';

const Group = () => null;
Group.displayName = "Group";

const CTextInput = () => null;
CTextInput.displayName = "TextInput";

const CDropdown = () => null;
CDropdown.displayName = "DropDown";

export default function Form(props) {
    // event object that contains the value of all form inputs
    const [event, setEvent] = {};

    /**
     * Renders all ojects in a given group
     * 
     * @param {Object} props component properties
     */
    const renderAll = groupProps => {
        const { children } = groupProps;
        const components = findAll(children, [Group, CTextInput, CDropdown])
    }
}

Form.Group = Group;