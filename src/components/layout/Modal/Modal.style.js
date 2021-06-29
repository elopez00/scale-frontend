import { StyleSheet } from 'react-native'

export const style = StyleSheet.create({
    backdrop: {
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 5,
        justifyContent: "space-around",
        alignItems: "center"
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 25,
        padding: 20,
        width: "80%",
        position: "relative"
    },
    close: {
        color: "black",
        fontSize: 25,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        width: 25
    },
    textHeader: {
        fontSize: 23,
        fontFamily: "Lato_700Bold",
        color: "black"
    }
})