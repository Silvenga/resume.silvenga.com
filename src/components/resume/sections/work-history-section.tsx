import { Text, View } from "@react-pdf/renderer";
import { WorkHistoryItem } from "../../../data/schema";
import { forceRemountOnFastRefresh } from "../../../utilities/fast-refresh";
import { PdfMarkdown } from "../../markdown/pdf-markdown";
import { tw } from "../styles";
import { useResume } from "../use-resume";
import { InlineTimeRange } from "./inline-time-range";

// TODO
forceRemountOnFastRefresh(module);

export function WorkHistorySection() {
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
        <View style={tw("flex flex-row mb-6")}>
            <View style={tw("flex flex-col basis-1/3 pr-3 border-r border-gray-300")}>
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
            <View style={tw("flex flex-col basis-2/3 pl-6")}>
                <PdfMarkdown markdown={description} />
            </View>
        </View>
    );
}
