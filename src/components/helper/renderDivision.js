import React from 'react'
import { Divider, Break } from '../layout';

/**
 * Given the index, this function will make sure to return a divider for all
 * iterations except the last one to avoid leaving trailing divders
 *
 * @param {Number} index index of element
 * @param {Number} last index of last element
 * @returns {Component} subdivider component
 */
export const renderDivider = (index, last) => {
    if (index !== last) {
        return <Divider />;
    }
};

/**
 * Given the index, this function will make sure to return a sub-divider for all
 * iterations except the last one to avoid leaving trailing sub-divders
 *
 * @param {Number} index index of element
 * @param {Number} last index of last element
 * @returns {Component} subdivider component
 */
 export const renderSubDivider = (index, last) => {
    if (index !== last) {
        return <Divider sub/>;
    }
};

/**
 * Given the index, this function will make sure to return a break for all
 * iterations except the last one to avoid trailing breaks
 *
 * @param {Number} index index of element
 * @param {Number} last index of last element
 * @returns {Component} break component
 */
export const renderBreak = (index, last) => {
    if (index !== last) {
        return <Break />;
    }
};