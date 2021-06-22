import { StyleSheet } from "react-native";
import colors from "../../../../assets/colors.json";

export const style = StyleSheet.create({
    module: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    category: {
        textAlign: "right",
    },
    payment: {
        textAlign: "right",
        color: colors.red,
    },
    transfer: {
        textAlign: "right",
        color: colors.red,
    },
});
