import { StyleSheet } from 'react-native'
import colors from '../../../assets/colors.json'

export const style = StyleSheet.create({
    body: {
        fontFamily: "Lato_400Regular",
        fontSize: 16,
        color: colors.white,
    },
    title: {
        fontFamily: "Lato_700Bold",
        fontSize: 14,
        color: colors.red,
    },
    subtitle: {
        fontFamily: "Lato_400Regular",
        fontSize: 14,
        color: colors.trueGray,
    },
    headerBody: {
        fontFamily: "Lato_400Regular",
        fontSize: 28,
        color: colors.white,
    },
    headerTitle: {
        fontFamily: "Lato_700Bold",
        fontSize: 20,
        color: colors.red,
        marginBottom: 5
    },
    headerSubtitle: {
        fontFamily: "Lato_400Regular",
        fontSize: 18,
        color: colors.trueGray,
        marginBottom: 5
    }
})