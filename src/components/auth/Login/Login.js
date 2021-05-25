import React, { useState } from "react";
import { View, Image, Text } from "react-native";

import Logo from "../../../assets/scale-logo.png";
import { style } from "./Login.style";
import { TextInput, Label, Button } from "../../layout";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);

    const login = async () => {
        try {
            let settings = {
                body: JSON.stringify({
                    email,
                    password,
                }),
                method: "post",
                credentials: "include",
                headers: new Headers({ "content-type": "application/json" }),
            };
            let res = await fetch(
                "http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0/login",
                settings
            );
            let authentication = await res.json();
            if (!authentication.status) {
                console.log("user authenticated");
                setInvalid(false);
                props.checkAuth();
                // props.setPage("dashboard")
            } else {
                console.log("Authentication failed", authentication);
                setInvalid(true);
                console.log(authentication.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={style.module}>
            <Image style={style.image} source={Logo} />
            <Text style={style.header}>Welcome to Scale</Text>
            <Text style={style.textWrapper}>
                <Text style={style.text}>New to Scale? </Text>
                <Text
                    style={style.hyperlink}
                    onPress={() => props.setType("signup")}
                >
                    Sign up here
                </Text>
            </Text>
            <Label label="Email">
                <TextInput
                    invalid={invalid}
                    placeholder="jsmith@email.com"
                    onChangeText={(email) => setEmail(email)}
                />
            </Label>
            <Label label="Password">
                <TextInput
                    invalid={invalid}
                    secureTextEntry
                    placeholder="**********"
                    onChangeText={(password) => setPassword(password)}
                />
            </Label>
            <Button style={{ marginTop: 20 }} onPress={() => login()}>
                Log in
            </Button>
        </View>
    );
}
