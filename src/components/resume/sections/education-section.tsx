import { Text, View } from "@react-pdf/renderer";
import { EducationItem } from "../../../data/schema";
import { forceRemountOnFastRefresh } from "../../../utilities/fast-refresh";
import { tw } from "../styles";
import { useResume } from "../use-resume";
import { InlineTimeRange } from "./common/inline-time-range";
import { Section } from "./common/section";
import { SectionHeader } from "./common/section-header";

// TODO
forceRemountOnFastRefresh(module);

export function EducationSection() {
    const { resume: { education } } = useResume();
    return (
        <Section>
            <SectionHeader>
                Education
            </SectionHeader>
            {education.map(x => (
                <EducationItemSection {...x} key={x.label} />
            ))}
        </Section>
    );
}

function EducationItemSection({ label, degree, grade, timeRange }: EducationItem) {
    const { styles } = useResume();
    return (
        <View style={tw("flex flex-row mb-6")}>
            <View wrap={false} style={tw("flex flex-col basis-1/3 pr-3 py-1 self-start")}>
                <Text style={styles.h3}>
                    {label}
                </Text>
                <Text style={tw("mt-1")}>
                    <InlineTimeRange range={timeRange} />
                </Text>
            </View>
            <View style={tw("flex flex-col basis-2/3 pl-6 py-1 border-l border-gray-300 ml-auto")}>
                <Text style={tw("mb-1")}>
                    {degree}
                </Text>
                <Text>
                    GPA {grade}
                </Text>
            </View>
        </View>
    );
}
