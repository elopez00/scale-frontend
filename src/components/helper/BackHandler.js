import React, { useEffect, Fragment } from 'react';
import { BackHandler as Handler } from 'react-native';

import PropTypes from 'prop-types'

BackHandler.propTypes = {
    /** Function that will be executed when back handler is activated */
    handler: PropTypes.func.isRequired,
}

export default function BackHandler(props) {
    /**
     * acts as componentDidMount and componentWillUnmount functions to add and remove
     * back handler event listeners
     */
    useEffect(() => {
        add();
        return remove;
    });

    /**
     * Add back handler event listener
     */
    const add = () =>
        Handler.addEventListener("hardwareBackPress", props.handler);

    /**
     * Remove back handler event listener
     */
    const remove = () => 
        Handler.removeEventListener("hardwareBackPress", props.handler);
    
    return <Fragment />
}