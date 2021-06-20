import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";

import { style } from "./Header.style";
import findAll from "../../helper/findAll";
import Text from "../Text/Text";
import IconButton from "../IconButton/IconButton";

const Placeholder = () => null;
Placeholder.displayName = "Placeholder";

const Button = () => null;
Button.displayName = "Button";

const Title = () => null;
Title.displayName = "Title";

class Header extends Component {
    renderAll() {
        const { children } = this.props;
        const components = findAll(children, [Title, Button, Placeholder]);
        let output = [];

        let titles = this.renderTitles(components.Title) || [];
        let buttons = this.renderButtons(components.Button) || [];
        let placeholders =
            this.renderPlaceholders(components.Placeholder) || [];

        [...titles, ...buttons, ...placeholders].forEach((component) => {
            output[component.index] = component.child;
        });

        return output;
    }

    renderTitles(titles) {
        return titles?.map((title) => {
            return {
                child: (
                    <Text key={Math.random()} header style={style.text}>
                        {title.child.props.children}
                    </Text>
                ),
                index: title.index,
            };
        });
    }

    renderButtons(buttons) {
        return buttons?.map((button) => {
            return {
                child: (
                    <View
                        key={Math.random()}
                        style={{
                            ...style.button,
                            alignItems: button.child.props.right
                                ? "flex-end"
                                : null,
                        }}
                    >
                        <IconButton {...button.child.props} />
                    </View>
                ),
                index: button.index,
            };
        });
    }

    renderPlaceholders(placeholders) {
        return placeholders?.map((placeholder) => {
            return {
                child: <View key={Math.random()} style={style.placeholder} />,
                index: placeholder.index,
            };
        });
    }

    render() {
        return (
            <View style={style.header}>
                <View style={style.innerHeader}>{this.renderAll()}</View>
            </View>
        );
    }
}

Header.Title = Title;
Header.Placeholder = Placeholder;
Header.Button = Button;
export default Header;
