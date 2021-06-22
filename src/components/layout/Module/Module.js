import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from 'prop-types'

import { style } from "./Module.style";
import findAll from "../../helper/findAll";
import Text from "../Text/Text";

/**
 * Components that separates two values with dots.
 */
const TypeSeparator = () => null;
TypeSeparator.displayName = "TypeSeparator";

/**
 * Component that groups components within a module in a light gray box.
 */
const Sub = () => null;
Sub.displayName = "Sub";

/**
 * Component that can allow for deeper lever formatting while keeping track of 
 * other sub components
 */
const Div = () => null;
Div.displayName = "Div"

class Module extends Component {
    /**
     * This function renders all components, sub-components or other in the way they
     * appear in the DOM.
     *
     * @returns {Components} Render-ready array of components
     */
    renderAll(props) {
        const { children } = props;
        const components = findAll(children, [TypeSeparator, Sub, Div]);
        let output = []; // output array

        // convert all objects to components
        let typeSeparators =
            this.renderTypeSeparator(components.TypeSeparator) || [];
        let subs = this.renderSub(components.Sub) || [];
        let others = components.other || [];
        let divs = this.renderDiv(components.Div) || [];

        // sort array of components O(n) because we know the index
        [...typeSeparators, ...others, ...subs, ...divs].forEach((component) => {
            output[component.index] = component.child;
        });

        return output;
    }

    /**
     * Renders all type separators in meodule
     * 
     * @param {Array} typeSeparators all type separators found in the children prop
     * @returns type separators as components in child prop
     */
    renderTypeSeparator(typeSeparators) {
        return typeSeparators?.map((separator) => {
            return {
                child: (
                    <View
                        key={Math.random()}
                        style={{
                            ...separator?.child?.props?.style,
                            ...style.typeSeparator,
                        }}
                    >
                        <Text style={style.text}>
                            {separator?.child?.props?.name}
                        </Text>
                        <View style={style.dots}>
                            <View style={style.dot} />
                            <View style={style.dot} />
                            <View style={style.dot} />
                            <View style={style.dot} />
                        </View>
                        <Text style={{ ...style.text, textAlign: "right" }}>
                            {separator?.child?.props?.value}
                        </Text>
                    </View>
                ),
                index: separator.index,
            };
        });
    }

    /**
     * Renders all sub components in module
     * 
     * @param {Array} subs all subarray components found in children prop
     * @returns sub modules as components in child prop
     */
    renderSub(subs) {
        return subs?.map(sub => {
            return {
                child: (<View key={Math.random()} style={style.sub}>{sub.child.props.children}</View>),
                index: sub.index
            }
        })
    }

    /**
     * This renders all divs in module
     * 
     * @param {Array} divs all divs in components found in children prop
     * @returns divs as components in child prop
     */
    renderDiv(divs) {
        return divs?.map(div => {
            return {
                child: (<View {...div.child.props}>{this.renderAll(div.child.props)}</View>),
                index: div.index,
            }
        })
    }

    render() {
        return (
            <View style={style.module}>
                {/* { this.props.children } */}
                {this.renderAll(this.props)}
            </View>
        );
    }
}

// prop types
TypeSeparator.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
}

// sub components instatiation
Module.TypeSeparator = TypeSeparator;
Module.Sub = Sub;
Module.Div = Div;

export default Module;
