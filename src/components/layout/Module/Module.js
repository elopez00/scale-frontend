import React, { Component } from "react";
import { View } from "react-native";

import { style } from "./Module.style";
import findAll from "../../helper/findAll";
import Text from "../Text/Text";

const TypeSeparator = () => null;
TypeSeparator.displayName = "TypeSeparator";

const Sub = () => null;
Sub.displayName = "Sub";

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
        let others = this.renderOther(components.other) || [];
        let divs = this.renderDiv(components.Div) || [];

        // sort array of components O(n) because we know the index
        [...typeSeparators, ...others, ...subs, ...divs].forEach((component) => {
            output[component.index] = component.child;
        });

        return output;
    }

    /**
     *
     * @param {Array} typeSeparators all type separators found in the children prop
     * @returns returns type separators as components
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

    renderSub(subs) {
        return subs?.map(sub => {
            return {
                child: (<View key={Math.random()} style={style.sub}>{sub.child.props.children}</View>),
                index: sub.index
            }
        })
    }

    renderOther(others) {
        return others.map((component) => {
            return {
                child: component.child,
                index: component.index,
            };
        });
    }

    renderDiv(divs) {
        return divs?.map(div => {
            return {
                child: (<View>{this.renderAll(div.child.props)}</View>),
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

Module.TypeSeparator = TypeSeparator;
Module.Sub = Sub;
Module.Div = Div;
export default Module;
