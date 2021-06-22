import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
    Lato_100Thin,
} from "@expo-google-fonts/lato";

import Loading from "./src/components/loading";
import Pages from './src/components/pages/Pages'
import Auth from "./src/components/auth";
import { StatusBar } from "./src/components/layout";

export default function App() {
    const [page, setPage] = useState("loading");
    const [linkToken, setToken] = useState("");

	// TODO - I need to implement this to the initial loadingF
    let [fontsLoaded] = useFonts({
        Lato_100Thin,
        Lato_400Regular,
        Lato_700Bold,
    });

    /**
     * This function will check the authentication status of the application. If the status
     * is falsey, then that means the user will be redirected to loading. If the status is
     * truthy then the user will be redirected to their dashboard.
     */
    const checkAuth = async () => {
        try {
            let res = await fetch(
                "http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0/"
            );

            let authenticated = await res.json();
            if (authenticated.status !== 200) {
                setPage("auth");
                console.log("not authenticated");
                return;
            }

            try {
                // get link token
                let raw = await fetch(
                    "http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0/token/link"
                );

                // convert the raw response into json
                let res = await raw.json();
                if (res.status !== 200) {
                    console.log(res);
                    return;
                }

                // set tokens
                setToken(res.result);
                console.log(res.message);
            } catch (err) {
                console.error(err);
            }

            setPage("dashboard");
            console.log("authenticated");
        } catch (err) {
            console.error(err);
        }
    };

	/**
     * Handles which page should be shown based on page state variable
	 * 
	 * @returns {Component} component containing viewed page
	 */
    const showPage = () => {
        switch (page) {
        case "dashboard": return <Pages {...{linkToken, fontsLoaded}}/>;
        case "auth": return <Auth setPage={setPage} checkAuth={checkAuth} />;
        default: return <Loading />;
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <SafeAreaProvider>
            <StatusBar />
            <View style={styles.container}>{showPage()}</View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#252629",
        alignItems: "center",
        justifyContent: "center",
    },
});
