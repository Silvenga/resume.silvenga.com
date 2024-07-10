import { ReactNode } from "react";
import { Document, Link, Page, Text, View, ViewProps } from "@react-pdf/renderer";
import { WorkHistoryItem } from "../../data/schema";
import { forceRemountOnFastRefresh } from "../../utilities/fast-refresh";
import { colors } from "./styles";
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
                <Header />
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

function Header() {
    const { styles, resume: { subject: { familyName, givenName, links, location } } } = useResume();
    return (
        <View style={{ marginBottom: 24 }}>
            <Text style={styles.h1}>{givenName} {familyName}</Text>
            <Text style={{}}>{location}</Text>
            <View style={{ display: "flex", flexDirection: "row" }} wrap>

            </View>
        </View>
    );
}

function WorkHistorySection() {
    const { styles, resume: { workHistory } } = useResume();
    return (
        <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={[styles.h2, { marginBottom: 12 }]}>Work Experience</Text>
            <View>
                {workHistory.map(x => (
                    <WorkHistoryItemSection {...x} key={x.label} />
                ))}
            </View>
        </View>
    );
}

function WorkHistoryItemSection({ label, entity, description, technologies, timeRange }: WorkHistoryItem) {
    const { styles } = useResume();
    return (
        <View style={{ marginBottom: 12, display: "flex", flexDirection: "row" }}>
            <View style={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "40%",
                borderRight: 1,
                paddingRight: 12
            }}>
                <Text style={styles.h3}>
                    {entity}
                </Text>
                <Text style={{}}>
                    {label}
                </Text>
            </View>
            <View style={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "60%",
                paddingLeft: 12
            }}>
                <Text>
                    {description}
                </Text>
            </View>
        </View>
    );
}
