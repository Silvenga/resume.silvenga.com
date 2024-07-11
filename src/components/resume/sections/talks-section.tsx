import { useMemo } from "react";
import { Link, Text, View } from "@react-pdf/renderer";
import { Talk } from "../../../data/schema";
import { forceRemountOnFastRefresh } from "../../../utilities/fast-refresh";
import { tw } from "../styles";
import { useResume } from "../use-resume";
import { Section } from "./common/section";

// TODO
forceRemountOnFastRefresh(module);

export function TalksSection() {
    const { styles, resume: { talks } } = useResume();
    return (
        <Section>
            <Text style={[styles.h2, tw("mb-3")]}>Talks</Text>
            <View>
                {talks.map(x => (
                    <TalksItemSection {...x} key={x.label} />
                ))}
            </View>
        </Section>
    );
}

function TalksItemSection({ label, description, link, year }: Talk) {
    const { styles } = useResume();
    const linkLabel = useMemo(() => {
        const url = new URL(link);
        return url.host;
    }, [link]);
    return (
        <View style={tw("flex flex-row mb-6")}>
            <View wrap={false} style={tw("flex flex-col basis-1/3 pr-3 py-1 self-start")}>
                <Text style={styles.h3}>
                    {label}
                </Text>
                <Text style={tw("mt-1")}>
                    {year}
                </Text>
            </View>
            <View style={tw("flex flex-col basis-2/3 pl-6 py-1 border-l border-gray-300 ml-auto")}>
                <Text style={tw("mb-1")}>
                    {description}
                </Text>
                <Text>
                    <Link style={tw("text-gray-900")} href={link}>{linkLabel}</Link>
                </Text>
            </View>
        </View>
    );
}
