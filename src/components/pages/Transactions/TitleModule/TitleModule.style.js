import { StyleSheet } from 'react-native'

export const style = StyleSheet.create({
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    bodyTitle: {
        textAlign: "right",
    },
    bank: {
        flexDirection: "row",
        alignItems: "center"
    },
    transaction: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    transactionText: {
        textAlign: "right"
    },
    scroll: {
        minWidth: "100%"
    },
    scrollContent: {
        alignItems: "center"
    },
    bankIcon: {
        height: 40,
        width: 40,
        marginRight: 10,
    }
})