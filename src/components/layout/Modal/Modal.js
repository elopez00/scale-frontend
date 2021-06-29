import React from 'react'

import { style } from './Modal.style'

import { View } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import Text from '../Text/Text'
import TextInput from '../TextInput/TextInput'
import IconButton from '../IconButton/IconButton'
import Break from '../Break/Break'
import Label from '../Label/Label'
import Dropdown from '../Dropdown/Dropdown'

import findAll from '../../helper/findAll'
import { findByType } from '../../helper/findByType'
import PropTypes from 'prop-types'
import uuid from 'react-native-uuid'

const Title = () => null;
Title.displayName = "Title";

const CTextInput = () => null;
CTextInput.displayName = "TextInput"

const CDropdown = () => null;
CDropdown.displayName = "Dropdown"

const Sub = () => null;
Sub.displayName = "Sub"

export default function Modal(props) {
    /**
     * Grabs all the subcomponents and elements from the children props and 
     * returns them formatted and in the order placed
     */
    const renderAll = () => {
        const { children } = props;
        const components = findAll(children, [CTextInput, CDropdown]);
        let output = [];

        let textInputs = renderTextInputs(components.TextInput) || [];
        let dropdowns = renderDropdowns(components.Dropdown) || [];
        let subs = renderSubs(components.Sub) || [];
        let others = components.other || [];

        [...textInputs, ...dropdowns, ...subs, ...others].forEach(component => 
            output[component.index] = component?.child
        )

        return output;
    }

    /** Renders the title */
    const renderTitle = () => {
        const { children } = props;
        let titles = findByType(children, Title);

        if (!titles.length) return;

        return (
            <Text header style={style.textHeader}>
                { titles[0]?.props.children }
            </Text>
        )
    }

    /**
     * Renders text inputs in modal
     * 
     * @param {Array} textInputs array of text input objects
     * @returns 
     */
    const renderTextInputs = (textInputs) => {
        return textInputs?.map(textInput => {
            return {
                child: (
                    <Label label={textInput.child.props.label} opp key={uuid.v4()}>
                        <TextInput opp {...textInput.child.props}/>
                        <Break />
                    </Label>
                ),
                index: textInput.index
            }
        })
    }
    

    const renderDropdowns = (dropdowns) => {
        return dropdowns?.map(dropdown => {
            return {
                child: (
                    <Label label={dropdown?.child?.props?.label} opp key={uuid.v4()}>
                        <Dropdown {...dropdown.child.props}>
                            {dropdown.child.props.children}
                        </Dropdown>
                        <Break />
                    </Label>
                ),
                index: dropdown.index
            }
        })
    }

    const renderSubs = (subs) => {

    }

    return (
        <View style={style.backdrop}>
            <View style={style.modal}>
                <View style={style.header}>
                    { renderTitle() }
                    <IconButton icon="close" style={style.close}/>
                </View>
                <Break />
                { renderAll() }
            </View>
        </View>
    )
}

Modal.Dropdown = CDropdown;
Modal.Title = Title;
Modal.TextInput = CTextInput;