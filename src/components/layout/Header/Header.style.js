import { StyleSheet } from 'react-native'
import colors from '../../../assets/colors.json'

export const style = StyleSheet.create({
    header: {
        height: 90,
        justifyContent: "space-around",        
        alignItems: 'center',
    },
    innerHeader: {
        maxWidth: "90%",
        minWidth: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        textAlign: "center",
    },
    button: {
        flex: 1,
    },
    placeholder: {
        flex: 1
    }
})