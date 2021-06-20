import { StyleSheet } from 'react-native'
import colors from '../../../assets/colors.json'

export const style = StyleSheet.create({
    divider: {
        backgroundColor: colors.lightGray,
        width: "100%",
        height: 1,
        marginTop: 15,
        marginBottom: 15
    },
    sub: {
        backgroundColor: colors.gray,
        width: "100%",
        height: 1,
        marginTop: 15,
        marginBottom: 15
    }
})