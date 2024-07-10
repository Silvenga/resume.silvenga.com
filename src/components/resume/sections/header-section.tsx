import { Text, View } from "@react-pdf/renderer";
import { useResume } from "../use-resume";

export function HeaderSection() {
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
