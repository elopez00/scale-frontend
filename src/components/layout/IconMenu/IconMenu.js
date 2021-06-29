import React, { useState } from "react";

import { View, Animated } from "react-native";
import IconButton from "../IconButton/IconButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import Text from "../Text/Text";
import Break from '../Break/Break'

import { findByType } from "../../helper/findByType";
import uuid from "react-native-uuid";
import { style } from "./IconMenu.style";
import PropTypes from 'prop-types'

const Item = () => null;
Item.displayName = "IconMenu.Item";

Item.propTypes = {
    /** Callback function that will be executed on Item press */
    onPress: PropTypes.func.isRequired,
    /** Highlight the text red and separate it from other items to denote severity of action */
    red: PropTypes.bool
}

export default function IconMenu(props) {
    // state
    const opacity = useState(new Animated.Value(0))[0];
    const [display, setDisplay] = useState("none");

    /**
     * Toggles the menu animation for the icon menu dropdown
     */
    const animateToggle = () => {
        if (display !== "flex") {
            setDisplay("flex");
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setDisplay("none");
            });
        }
    };

    /**
     * Takes all the list items from the children's props and formats them
     *
     * into item menu subcomponents
     * @returns render ready list of items
     */
    const renderItems = () => {
        const { children } = props;
        const items = findByType(children, Item);

        if (!items.length) return null;
        return items.map((item) => (
            <TouchableOpacity key={uuid.v4()}  onPressIn={() => item.props.onPress()} elevation={30}>
                <View key={uuid.v4()}>
                        {item.props.red ? <View style={style.divider}/> : null}
                        <Text
                            style={{
                                ...style.text,
                                color: item.props.red ? "#ff5757" : "#000",
                            }}
                        >
                            {item.props.children}
                        </Text>
                {!item.props.red ? <Break /> : null}
                </View>
            </TouchableOpacity>
        ));
    };

    // toggle style
    const toggle = {
        display: display,
        opacity: opacity,
    };

    return (
        <View style={style.module}>
            <View style={{ position: "absolute", right: 0}}>
                <View style={{ height: 30 }} />
                <View style={style.button}>
                    <Animated.View style={{ ...style.dropdown, ...toggle }}>
                        {renderItems()}
                    </Animated.View>
                </View>
            </View>
            <IconButton
                icon={props.icon}
                onPress={() => animateToggle()}
                style={props.style}
            />
        </View>
    );
}

IconMenu.Item = Item;
