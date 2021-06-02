import { StyleSheet } from 'react-native'

export const style = StyleSheet.create({
    loadingCircle: {
        height: 200,
        width: 200,
    },
    module: {
        backgroundColor: "#252629",
        alignItems: "center",
        position: "relative"
    },
    text: {
        color: "white",
        fontSize: 25,
        letterSpacing: 2,
        fontFamily: "Lato_400Regular"
    },
    loading: {
        position: "absolute",
        top: 88
    }
})