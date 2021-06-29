import { StyleSheet } from 'react-native'
import colors from '../../../assets/colors.json'

export const style = StyleSheet.create({
    label: {
        fontSize: 14,
        color: "white",
        marginBottom: 10,
        fontFamily: "Lato_400Regular",
        paddingLeft: 20,
    },
    opp: {
        fontFamily: "Lato_700Bold",
        fontSize: 14,
        color: colors.red,
        paddingLeft: 10,
        marginBottom: 5
    }
})