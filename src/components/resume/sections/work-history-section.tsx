import { Text, View } from "@react-pdf/renderer";
import { WorkHistoryItem } from "../../../data/schema";
import { forceRemountOnFastRefresh } from "../../../utilities/fast-refresh";
import { PdfMarkdown } from "../../markdown/pdf-markdown";
import { tw } from "../styles";
import { useResume } from "../use-resume";
import { InlineTimeRange } from "./common/inline-time-range";
import { Section } from "./common/section";

// TODO
forceRemountOnFastRefresh(module);

export function WorkHistorySection() {
    const { styles, resume: { workHistory } } = useResume();
    return (
        <Section>
            <Text style={[styles.h2, tw("mb-3")]}>Work Experience</Text>
            <View>
                {workHistory.map(x => (
                    <WorkHistoryItemSection {...x} key={x.label} />
                ))}
            </View>
        </Section>
    );
}

function WorkHistoryItemSection({ label, entity, description, technologies, timeRange }: WorkHistoryItem) {
    const { styles } = useResume();

    const backendTechnologies = technologies.backend?.map(x => x.name).join(", ");
    const frontendTechnologies = technologies.frontend?.map(x => x.name).join(", ");
    const databaseTechnologies = technologies.database?.map(x => x.name).join(", ");
    const infrastructureTechnologies = technologies.infrastructure?.map(x => x.name).join(", ");
    // const methodologiesTechnologies = technologies.methodologies?.map(x => x.name).join(", ");
    // const testingTechnologies = technologies.testing?.map(x => x.name).join(", ");

    return (
        <View style={tw("flex flex-row mb-6")}>
            <View wrap={false} style={tw("flex flex-col basis-1/3 pr-3 py-1 self-start")}>
                <Text style={styles.h3}>
                    {entity}
                </Text>
                <Text style={tw("mt-1")}>
                    {label}
                </Text>
                <Text style={tw("mt-2")}>
                    <InlineTimeRange range={timeRange} />
                </Text>
            </View>
            <View style={tw("flex flex-col basis-2/3 pl-6 py-1 border-l border-gray-300 ml-auto")}>
                <View style={tw("mb-2")}>
                    <PdfMarkdown markdown={description} />
                </View>
                {!!backendTechnologies && (
                    <View wrap={false} style={tw("mt-2")}>
                        <Text style={tw("text-gray-700 font-semibold mb-1")}>Backend Technologies</Text>
                        <Text style={tw("")}>
                            {backendTechnologies}
                        </Text>
                    </View>
                )}
                {!!frontendTechnologies && (
                    <View wrap={false} style={tw("mt-2")}>
                        <Text style={tw("text-gray-700 font-semibold mb-1")}>Frontend Technologies</Text>
                        <Text style={tw("")}>
                            {frontendTechnologies}
                        </Text>
                    </View>
                )}
                {/* {!!testingTechnologies && (
                    <View wrap={false} style={tw("mt-2")}>
                        <Text style={tw("text-gray-700 font-semibold mb-1")}>Testing Technologies</Text>
                        <Text style={tw("")}>
                            {testingTechnologies}
                        </Text>
                    </View>
                )} */}
                {!!databaseTechnologies && (
                    <View wrap={false} style={tw("mt-2")}>
                        <Text style={tw("text-gray-700 font-semibold mb-1")}>Database Technologies</Text>
                        <Text style={tw("")}>
                            {databaseTechnologies}
                        </Text>
                    </View>
                )}
                {!!infrastructureTechnologies && (
                    <View wrap={false} style={tw("mt-2")}>
                        <Text style={tw("text-gray-700 font-semibold mb-1")}>Infrastructure Technologies</Text>
                        <Text style={tw("")}>
                            {infrastructureTechnologies}
                        </Text>
                    </View>
                )}
                {/* {!!methodologiesTechnologies && (
                    <View wrap={false} style={tw("mt-2")}>
                        <Text style={tw("text-gray-700 font-semibold mb-1")}>Methodologies</Text>
                        <Text style={tw("")}>
                            {methodologiesTechnologies}
                        </Text>
                    </View>
                )} */}
            </View>
        </View>
    );
}
