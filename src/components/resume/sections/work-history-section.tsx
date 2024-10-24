import { Text, View } from "@react-pdf/renderer";
import { WorkHistoryItem } from "../../../data/schema";
import { forceRemountOnFastRefresh } from "../../../utilities/fast-refresh";
import { PdfMarkdown } from "../../markdown/pdf-markdown";
import { tw } from "../styles";
import { useResume } from "../use-resume";
import { InlineTimeRange } from "./common/inline-time-range";
import { Section } from "./common/section";
import { SectionHeader } from "./common/section-header";
import { TechnologiesList } from "./common/technology-list";

// TODO
forceRemountOnFastRefresh(module);

export function WorkHistorySection() {
    const { resume: { workHistory } } = useResume();
    return (
        <Section>
            <SectionHeader>
                Experience
            </SectionHeader>
            {workHistory.map(x => (
                <WorkHistoryItemSection {...x} key={x.label} />
            ))}
        </Section>
    );
}

function WorkHistoryItemSection({ label, entity, description, technologies, timeRange, remote }: WorkHistoryItem) {
    const { styles } = useResume();
    return (
        <View style={tw("flex flex-col mb-3")}>
            <View wrap={false} style={tw("flex flex-row py-1")}>
                <Text style={{ ...styles.h3, ...tw("mr-auto") }}>
                    {entity}
                </Text>
                <Text>
                    <InlineTimeRange range={timeRange} />
                </Text>
            </View>
            <View wrap={false} style={tw("flex flex-row py-1 pl-6 font-semibold")}>
                <Text>
                    {label}
                </Text>
                {!!remote && (
                    <>
                        <Text>, Remote</Text>
                    </>
                )}
            </View>
            <View style={tw("flex flex-col pl-6 py-1")}>
                <PdfMarkdown markdown={description} />
                <Technologies technologies={technologies} />
            </View>
        </View>
    );
}

function Technologies({ technologies }: Pick<WorkHistoryItem, "technologies">) {
    return (
        <View wrap={false}>
            {!!technologies.backend && (
                <View wrap={false}>
                    <Text style={tw("text-gray-700 font-semibold mb-1")}>Backend Technologies</Text>
                    <TechnologiesList technologies={technologies.backend} />
                </View>
            )}
            {!!technologies.frontend && (
                <View wrap={false} style={tw("mt-2")}>
                    <Text style={tw("text-gray-700 font-semibold mb-1")}>Frontend Technologies</Text>
                    <TechnologiesList technologies={technologies.frontend} />
                </View>
            )}
            {!!technologies.database && (
                <View wrap={false} style={tw("mt-2")}>
                    <Text style={tw("text-gray-700 font-semibold mb-1")}>Database Technologies</Text>
                    <TechnologiesList technologies={technologies.database} />
                </View>
            )}
            {!!technologies.infrastructure && (
                <View wrap={false} style={tw("mt-2")}>
                    <Text style={tw("text-gray-700 font-semibold mb-1")}>Infrastructure Technologies</Text>
                    <TechnologiesList technologies={technologies.infrastructure} />
                </View>
            )}
        </View>
    );
}
