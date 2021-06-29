import { StyleSheet } from 'react-native'
import colors from '../../../assets/colors.json'

export const style = StyleSheet.create({
    button: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: colors.red,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    icon: {
        fontSize: 20
    },
    menu: {
        backgroundColor: colors.gray,
        padding: 15,
        borderRadius: 20,
        position: "absolute",
        top: 45,
        width: "100%"
    },
})