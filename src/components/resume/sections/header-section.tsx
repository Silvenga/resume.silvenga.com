import { Link, Text, View } from "@react-pdf/renderer";
import { forceRemountOnFastRefresh } from "../../../utilities/fast-refresh";
import { tw } from "../styles";
import { useResume } from "../use-resume";
import { PdfQrCode } from "./common/pdf-qr-code";

// TODO
forceRemountOnFastRefresh(module);

export function HeaderSection() {
    const { styles, resume: { permaLink, subject: { familyName, givenName, links, location } } } = useResume();
    return (
        <View style={tw("flex flex-row")}>
            <View>
                <Text style={styles.h1}>{givenName} {familyName}</Text>
                <Text>{location}</Text>
                <Text>TODO</Text>
            </View>
            <View style={tw("ml-auto flex flex-col")}>
                <PdfQrCode style={tw("ml-auto")} value={permaLink} size={96} margin={0} />
                <Link style={tw("text-gray-900 self-center mt-2 text-sm")} href={permaLink}>Web Version</Link>
            </View>
        </View>
    );
}
