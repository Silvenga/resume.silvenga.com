import { Text } from "@react-pdf/renderer";
import { useResume } from "../use-resume";
import { Section } from "./common/section";

export function HeaderSection() {
    const { styles, resume: { subject: { familyName, givenName, links, location } } } = useResume();
    return (
        <Section>
            <Text style={styles.h1}>{givenName} {familyName}</Text>
            <Text>{location}</Text>
        </Section>
    );
}
