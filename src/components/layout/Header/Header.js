import React from "react";
import { View } from "react-native";

import { style } from "./Header.style";
import findAll from "../../helper/findAll";
import Text from "../Text/Text";
import IconButton from "../IconButton/IconButton";
import IconMenu from '../IconMenu/IconMenu'

import uuid from 'react-native-uuid'

const Placeholder = () => null;
Placeholder.displayName = "Placeholder";

const Button = () => null;
Button.displayName = "Button";

const Title = () => null;
Title.displayName = "Title";

const Menu = () => null;
Menu.displayName = "Menu";

export default function Header(props) {
    const renderAll = () => {
        const { children } = props;
        const components = findAll(children, [Title, Button, Placeholder, Menu]);
        let output = [];

        let titles = renderTitles(components.Title) || [];
        let buttons = renderButtons(components.Button) || [];
        let placeholders = renderPlaceholders(components.Placeholder) || [];
        let menus = renderMenus(components.Menu) || [];

        // console.log(menus);

        [...titles, ...buttons, ...placeholders, ...menus].forEach((component) => {
            output[component.index] = component.child;
        });

        return output;
    };

    const renderTitles = (titles) => 
        titles?.map((title) => {
            return {
                child: (
                    <Text key={Math.random()} header style={style.text}>
                        {title.child.props.children}
                    </Text>
                ),
                index: title.index,
            };
        });

    const renderButtons = (buttons) =>
        buttons?.map((button) => {
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

    const renderMenus = (menus) => 
        menus?.map((menu) => {
            return {
                child: (
                    <View key={uuid.v4()}
                        style={{
                            ...style.button,
                            alignItems: menu.child.props.right
                                ? "flex-end"
                                : null,
                        }}
                    >
                        <IconMenu {...menu.child.props}>
                            {menu.child.props.children}
                        </IconMenu>
                    </View>
                ),
                index: menu.index
            }
        })
    

    const renderPlaceholders = (placeholders) => 
        placeholders?.map((placeholder) => {
            return {
                child: <View key={Math.random()} style={style.placeholder} />,
                index: placeholder.index,
            };
        });

    return (
        <View style={style.header}>
            <View style={style.innerHeader}>{renderAll()}</View>
        </View>
    );
}

Header.Title = Title;
Header.Placeholder = Placeholder;
Header.Button = Button;
Header.Menu = Menu;
