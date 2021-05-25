import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    module: {
        alignItems: "center",
    },
    image: {
        maxHeight: 150,
        maxWidth: 150,
    },
    header: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
        fontFamily: "Lato_400Regular",
        marginBottom: 5,
    },
    text: {
        fontFamily: "Lato_400Regular",
        color: "white",
    },
    hyperlink: {
        fontFamily: "Lato_700Bold",
        color: "#ff5757",
        textDecorationLine: "underline",
    },
    textWrapper: {
        marginBottom: 35,
    },
    inputGroup: {
        flexDirection: "row",
        minWidth: "80%",
    },
    input: {
        flex: 1,
    },
});
