import React, {useState, useEffect} from 'react'

import { style } from './Modal.style'

import { Animated, View } from 'react-native'
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
    const visibility = useState(new Animated.Value(0))[0];
    const [display, setDisplay] = useState(false);

    /**
     * Toggles modal visibility
     * 
     * @param {Boolean} show the property that determines whether to show the modal or not
     */
    const animateToggle = () => {
        if (display) {
            Animated.timing(visibility, {
                toValue: 0,
                useNativeDriver: true,
                duration: 300
            }).start(() => {
                setDisplay(false);
            });
        } else {
            setDisplay(true);
            Animated.timing(visibility, {
                toValue: 1,
                useNativeDriver: true,
                duration: 300
            }).start();
        }
    }

    useEffect(() => {
        props.showModal !== display && animateToggle();
    })

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
     * @returns formatted text inputs
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
    
    /**
     * Renders all dropdown sub components
     * 
     * @param {Array} dropdowns array of dropdown objects 
     * @returns formatted dropdown objects
     */
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

    // module style
    const showModule = {
        opacity: visibility,
        display: display ? "flex" : "none",
        zIndex: display ? 5 : -5
    }

    return (
        <Animated.View style={[style.backdrop, showModule]}>
            <View style={[style.modal, props.style]}>
                <View style={style.header}>
                    { renderTitle() }
                    { !props.overrideClose ? 
                        <IconButton icon="close" style={style.close} onPress={() => props.onClose()}/> : null
                    }
                </View>
                <Break />
                { renderAll() }
            </View>
        </Animated.View>
    )
}

Modal.Dropdown = CDropdown;
Modal.Title = Title;
Modal.TextInput = CTextInput;