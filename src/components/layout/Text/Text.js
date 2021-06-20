import React from "react";
import { Text as NativeText } from "react-native";

import { style } from "./Text.style";

export default function Text(props) {
    const renderText = () => {
        if (props.header) {
            switch (true) {
                case props.title:
                    return (
                        <NativeText
                            style={{ ...props.style, ...style.headerTitle }}
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
                            style={{ ...props.style, ...style.headerBody }}
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
                            style={{ ...props.style, ...style.subtitle }}
                        >
                            {props.children}
                        </NativeText>
                    );
                default:
                    return (
                        <NativeText style={{ ...props.style, ...style.body }}>
                            {props.children}
                        </NativeText>
                    );
            }
        }
    };

    return renderText();
}
