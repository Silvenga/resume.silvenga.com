import { useMemo } from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { getResume } from "../../data/resume";
import { forceRemountOnFastRefresh } from "../../utilities/fast-refresh";
import { getResumeStyles } from "./styles";

// Fast refresh seems really confused here.
// So just force a remount on any child changes.
forceRemountOnFastRefresh(module);

export function ResumeDocument() {
    const styles = useMemo(() => getResumeStyles(), []);
    const { subject, education, talks, workHistory } = useMemo(() => getResume(), []);

    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                <View style={styles.section}>
                    <Text>Page #1</Text>
                </View>
            </Page>
            <Page size="LETTER" style={styles.page}>
                <View style={styles.section}>
                    <Text>Page #2</Text>
                </View>
            </Page>
        </Document>
    );
}
