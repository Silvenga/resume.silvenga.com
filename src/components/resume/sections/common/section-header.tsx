import { PropsWithChildren } from "react";
import { Text, View } from "@react-pdf/renderer";
import { tw } from "../../styles";
import { useResume } from "../../use-resume";

export function SectionHeader({ children }: PropsWithChildren) {
    const { styles } = useResume();
    return (
        <View style={tw("flex flex-row mb-3")}>
            <Text style={[styles.h2]}>{children}</Text>
            <View style={tw("grow flex")}>
                <Hr />
            </View>
        </View>
    );
}

function Hr() {
    return (
        <View style={tw("border-b border-gray-400 my-auto ml-6 h-0")} />
    );
}
