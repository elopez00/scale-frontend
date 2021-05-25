import React, { useEffect, useState } from "react";
import { TextInput as CTextInput, Animated } from "react-native";
import { style } from "./TextInput.style";

export default function TextInput(props) {
    const [invalid, setValidity] = useState(false);

    // invalid animation
    const invalidAnimation = new Animated.Value(0);

    useEffect(() => {
        props.invalid ? setValidity(true) : setValidity(false);
        invalid ? animateInvalid() : animateValid();
    });

    // animates invalid background to turn into a red hue
    const animateInvalid = () => {
        Animated.timing(invalidAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    // animates valid background to turn back to normal hue
    const animateValid = () => {
        Animated.timing(invalidAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    // interpolates value to their respective colors
    const invalidInterpolate = invalidAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [style.textinput.backgroundColor, "rgba(179, 0, 0, 0.3)"],
    });

    // style that will be fed to the Animated.View
    const validity = {
        backgroundColor: invalidInterpolate,
    };

    return (
        <Animated.View style={[style.textinput, validity, props.style]}>
            <CTextInput
                {...props}
                placeholderTextColor="#d6d6d6"
                style={ style.inputContent      }
            />
        </Animated.View>
    );
}
