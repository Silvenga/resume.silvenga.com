import { ReactNode } from "react";
import { Document, Link, Page, Text, View } from "@react-pdf/renderer";
import { forceRemountOnFastRefresh } from "../../utilities/fast-refresh";
import { HeaderSection } from "./sections/header-section";
import { WorkHistorySection } from "./sections/work-history-section";
import { useResume } from "./use-resume";

// Fast refresh seems really confused here.
// So just force a remount on any child changes.
forceRemountOnFastRefresh(module);

const pageSize = "LETTER";

export function ResumeDocument() {
    const { now, resume: { subject } } = useResume();
    const fullName = `${subject.givenName} ${subject.familyName}`;
    return (
        <Document
            title={`${fullName} Resume ${now.year}`}
            author={fullName}
            pageLayout="oneColumn">
            <ResumePage>
                <HeaderSection />
                <WorkHistorySection />
            </ResumePage>
        </Document>
    );
}

function ResumePage({ children }: { children: ReactNode }) {
    const { styles } = useResume();
    return (
        <Page size={pageSize} style={styles.page} wrap>
            {children}
            <Text
                style={{
                    textAlign: "center",
                    position: "absolute",
                    bottom: 12,
                    left: 0,
                    right: 0
                }}
                render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )}
                fixed />
        </Page>
    );
}
