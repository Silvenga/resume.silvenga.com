import { Document, Text, View } from "@react-pdf/renderer";
import { forceRemountOnFastRefresh } from "../../utilities/fast-refresh";
import { ResumePage } from "./sections/common/resume-page";
import { EducationSection } from "./sections/education-section";
import { HeaderSection } from "./sections/header-section";
import { TalksSection } from "./sections/talks-section";
import { WorkHistorySection } from "./sections/work-history-section";
import { tw } from "./styles";
import { useResume } from "./use-resume";

// Fast refresh seems really confused here.
// So just force a remount on any child changes.
forceRemountOnFastRefresh(module);

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
                <TalksSection />
                <EducationSection />
                <Footer />
            </ResumePage>
        </Document>
    );
}

export function Footer() {
    const { now } = useResume();
    return (
        <View style={tw("flex flex-col grow")}>
            <Text style={tw("mt-auto text-center")}>Generated on {now.toFormat("yyyy-LL-dd")}</Text>
        </View>
    );
}
