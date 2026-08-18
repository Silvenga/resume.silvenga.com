import { Text, View } from "@react-pdf/renderer";
import type { WorkHistoryItem } from "../../../data/schema";
import { PdfMarkdown } from "../../markdown/pdf-markdown";
import { tw } from "../styles";
import { useResume } from "../use-resume";
import { InlineTimeRange } from "./common/inline-time-range";
import { Section } from "./common/section";
import { SectionHeader } from "./common/section-header";
import { TechnologiesList } from "./common/technology-list";

export function WorkHistorySection() {
  const {
    resume: { workHistory },
  } = useResume();
  const workItems = workHistory.filter((x) => !x.hidden && !x.independent);
  const independentWorkItems = workHistory.filter((x) => !x.hidden && x.independent);
  return (
    <>
      <Section>
        <SectionHeader>Experience</SectionHeader>
        {workItems.map((x) => (
          <WorkHistoryItemSection {...x} key={x.label} />
        ))}
      </Section>
      <Section wrap={false}>
        <SectionHeader>Independent Work</SectionHeader>
        {independentWorkItems.map((x) => (
          <WorkHistoryItemSection {...x} key={x.label} />
        ))}
      </Section>
    </>
  );
}

function WorkHistoryItemSection({
  label,
  entity,
  description,
  technologies,
  timeRange,
  remote,
}: WorkHistoryItem) {
  const { styles } = useResume();
  return (
    <View style={tw("flex flex-col mb-3")} wrap={false}>
      <View wrap={false} style={tw("flex flex-row py-1")}>
        <Text style={{ ...styles.h3, ...tw("mr-auto") }}>{entity}</Text>
        <Text>
          <InlineTimeRange range={timeRange} />
        </Text>
      </View>
      <View wrap={false} style={tw("flex flex-row py-1 pl-6 font-semibold")}>
        <Text>{label}</Text>
        {remote && (
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
  const backendAndDatabase = combine(technologies.backend, technologies.database);
  return (
    <View wrap={false}>
      {!!backendAndDatabase && (
        <View wrap={false}>
          <Text style={tw("text-gray-700 font-semibold mb-1")}>Backend Technologies</Text>
          <TechnologiesList technologies={backendAndDatabase} />
        </View>
      )}
      {!!technologies.frontend && (
        <View wrap={false} style={tw("mt-2")}>
          <Text style={tw("text-gray-700 font-semibold mb-1")}>Frontend Technologies</Text>
          <TechnologiesList technologies={technologies.frontend} />
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

function combine<T>(left: T[] | undefined, right: T[] | undefined): T[] | undefined {
  if (left && right) {
    return [...left, ...right];
  }
  return left || right;
}
