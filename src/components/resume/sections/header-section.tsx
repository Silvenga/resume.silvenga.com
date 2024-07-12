import { Link, Text, View } from "@react-pdf/renderer";
import { forceRemountOnFastRefresh } from "../../../utilities/fast-refresh";
import { tw } from "../styles";
import { useResume } from "../use-resume";
import { PdfQrCode } from "./common/pdf-qr-code";

// TODO
forceRemountOnFastRefresh(module);

export function HeaderSection() {
    const { resume: { permaLink, subject: { familyName, givenName, links, location, title, tagLine } } } = useResume();
    return (
        <View style={tw("flex flex-row mb-6")}>
            <View style={tw("flex flex-col grow")}>
                <Text style={tw("text-5xl leading-snug text-black font-semibold")}>{givenName} {familyName}</Text>
                <Text style={tw("text-xl leading-snug text-gray-600 font-semibold mt-[-4px]")}>{title}</Text>
                <Text>{location}</Text>
                {/* Yoga is doing some odd things with flex-grow and text containers (min-width being odd?), so forcing an ideal-width */}
                <Text wrap style={tw("grow border-l-2 mt-6 border-gray-700 text-gray-900 font-medium px-4 py-1 w-[300px]")}>
                    {tagLine}
                </Text>
            </View>
            <View style={tw("flex flex-row")}>
                <View style={tw("flex flex-col items-end m-6 ml-auto")}>
                    {links.map(({ label, href }) => (
                        <View key={label}>
                            <Link style={tw("text-gray-900 font-medium")} href={href}>{getHrefLabel(href)}</Link>
                        </View>
                    ))}
                    <Link style={tw("text-gray-900 font-medium")} href={permaLink}>{getHrefLabel(permaLink)}</Link>
                </View>
                <View style={tw("ml-auto flex flex-col")}>
                    <PdfQrCode style={tw("ml-auto")} value={permaLink} size={96} margin={0} />
                </View>
            </View>
        </View>
    );
}

function getHrefLabel(href: string) {
    const url = new URL(href);
    return url.host + url.pathname;
}
