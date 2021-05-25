import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { style } from "./Auth.style";

import Login from "./Login";
import Signup from "./Signup";

export default function auth(props) {
    const [type, setType] = useState("login");

    const showPage = () => {
        switch (type) {
            case "login":
                return (
                    <Login
                        setType={setType}
                        setPage={props.setPage}
                        checkAuth={props.checkAuth}
                    />
                );
            case "signup":
                return (
                    <Signup
                        setType={setType}
                        setPage={props.setPage}
                        checkAuth={props.checkAuth}
                    />
                );
        }
    };

    return <View style={{ ...style.module }}>{showPage()}</View>;
}
