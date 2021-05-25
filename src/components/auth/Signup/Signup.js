import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import { style } from "./Signup.style";
import Logo from "../../../assets/scale-logo.png";
import { TextInput, Label, Button } from "../../layout";

export default function Signup(props) {
    // state
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {
        if (
            !email.length ||
            !password.length ||
            !firstname.length ||
            !lastname.length
        ) {
            console.error("Invalid Onboarder");
        } else {
            try {
                let settings = {
                    body: JSON.stringify({
                        firstname,
                        lastname,
                        email,
                        password,
                    }),
                    method: "post",
                    credentials: "include",
                    headers: new Headers({
                        "content-type": "application/json",
                    }),
                };

                let res = await fetch(
                    "http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0/onboard",
                    settings
                );
                let onboard = await res.json();
                if (!onboard.status) {
                    props.checkAuth();
                } else {
                    console.log("Failed to onboard user");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <View style={style.module}>
            <Image source={Logo} style={style.image} />
            <Text style={style.header}>New here?</Text>
            <Text style={style.textWrapper}>
                <Text style={style.text}>If you aren't, no problem. </Text>
                <Text
                    onPress={() => props.setType("login")}
                    style={style.hyperlink}
                >
                    Log in
                </Text>
            </Text>
            <View style={style.inputGroup}>
                <Label label="First Name" style={style.input}>
                    <TextInput
                        onChangeText={(firstname) => setFirstname(firstname)}
                        placeholder="John"
                        style={{ minWidth: 0, marginRight: 5 }}
                    />
                </Label>
                <Label label="Last Name" style={style.input}>
                    <TextInput
                        onChangeText={(lastname) => setLastname(lastname)}
                        placeholder="Smith"
                        style={{ minWidth: 0, marginLeft: 5 }}
                    />
                </Label>
            </View>
            <Label label="Email">
                <TextInput
                    placeholder="jsmith@gmail.com"
                    onChangeText={(email) => setEmail(email)}
                />
            </Label>
            <Label label="Password">
                <TextInput
                    placeholder="********"
                    secureTextEntry
                    onChangeText={(password) => setPassword(password)}
                />
            </Label>
            <Button onPress={() => signup()} style={{ marginTop: 20 }}>
                Sign up
            </Button>
        </View>
    );
}
