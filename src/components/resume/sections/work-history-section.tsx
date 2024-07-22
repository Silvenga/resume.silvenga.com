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
        <View wrap={false} style={tw("flex flex-row mb-3")}>
            <View wrap={false} style={tw("flex flex-col basis-1/3 pr-3 py-1 self-start")}>
                <Text style={styles.h3}>
                    {entity}
                </Text>
                <Text style={tw("mt-1")}>
                    {label}
                </Text>
                <Text>
                    <InlineTimeRange range={timeRange} />
                </Text>
                {!!remote && (
                    <Text>Remote</Text>
                )}
            </View>
            <View style={tw("flex flex-col basis-2/3 pl-6 py-1 border-l border-gray-300 ml-auto")}>
                <PdfMarkdown markdown={description} />
                <Technologies technologies={technologies} />
            </View>
        </View>
    );
}

function Technologies({ technologies }: Pick<WorkHistoryItem, "technologies">) {
    return (
        <View>
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
