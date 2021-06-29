import React from "react";
import { Text as NativeText } from "react-native";

import { style } from "./Text.style";

export default function Text(props) {
    /**
     * This functions renders styled native text
     * 
     * @returns styled text based on component prop
     */
    const renderText = () => {
        if (props.header) {
            switch (true) {
                case props.title:
                    return (
                        <NativeText
                            style={{ ...style.headerTitle, ...props.style }}
                        >
                            {props.children}
                        </NativeText>
                    );
                case props.subtitle:
                    return (
                        <NativeText
                            style={{ ...props.style, ...style.headerSubtitle }}
                        >
                            {props.children}
                        </NativeText>
                    );
                default:
                    return (
                        <NativeText
                            style={{ ...style.headerBody, ...props.style }}
                        >
                            {props.children}
                        </NativeText>
                    );
            }
        } else {
            switch (true) {
                case props.title:
                    return (
                        <NativeText style={{ ...props.style, ...style.title }}>
                            {props.children}
                        </NativeText>
                    );
                case props.subtitle:
                    return (
                        <NativeText
                            style={{ ...style.subtitle, ...props.style }}
                        >
                            {props.children}
                        </NativeText>
                    );
                default:
                    return (
                        <NativeText style={{ ...style.body, ...props.style }}>
                            {props.children}
                        </NativeText>
                    );
            }
        }
    };

    return renderText();
}
