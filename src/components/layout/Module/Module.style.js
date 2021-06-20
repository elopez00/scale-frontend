import { StyleSheet } from 'react-native'
import colors from '../../../assets/colors.json'

export const style = StyleSheet.create({
    module: {
        backgroundColor: colors.gray,
        borderRadius: 22,
        padding: 20,
        minWidth: "90%",
        marginBottom: 30
    },
    typeSeparator: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        alignItems: "center"
    },
    text: {
        flex: 1,
    },
    dots: {
        flexDirection: "row",
        width: 60,
        justifyContent: "space-around",
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 100,
        backgroundColor: colors.lightGray,
    },
    sub: {
        backgroundColor: colors.lightGray,
        borderRadius: 20,
        padding: 15,
    }
})