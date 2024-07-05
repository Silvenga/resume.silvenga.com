import { StyleSheet } from "@react-pdf/renderer";

export function getResumeStyles() {
    return StyleSheet.create({
        page: {
            flexDirection: "row",
            backgroundColor: "white"
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });
}
