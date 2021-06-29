import { StyleSheet } from 'react-native'

export const style = StyleSheet.create({
    module: {
        zIndex: 2,
    },
    button: {
        position: "relative",
        height: 50,
        width: 10
    },
    dropdown: {
        position: "absolute",
        marginTop: 10,
        right: 0,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        width: 150,
    },
    item: {
        zIndex: 80,
    },
    text: {
        color: "black",
        fontSize: 15
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "lightgray",
        marginBottom: 10,
    }
})