import { StyleSheet } from 'react-native'

export const style = StyleSheet.create({
    subModule: {
        backgroundColor: "#38383d",
        minWidth: "85%",
        maxWidth: "85%",
        padding: 20,
        borderRadius: 20
    },
    header: {
        fontFamily: "Lato_700Bold",
        color: "#ff5757",
        fontSize: 20,
        marginBottom: 10
    },
    body: {
        fontFamily: "Lato_400Regular",
        color: "white",
        fontSize: 30
    },
    break: {
        marginBottom: 20
    },
    row: {
        flexDirection: "row",
        margin: 10,
        marginTop: 0,
        paddingBottom: 10,
        justifyContent: "space-between",
        borderColor: "transparent",
        borderBottomColor: "#404247",
        borderWidth: 1
    },
    subheader: {
        color: "#ff5757",
        fontFamily: "Lato_700Bold",
        fontSize: 16,
    },
    subtext: {
        color: "white",
        fontFamily: "Lato_400Regular",
        fontSize: 16,
    }
})