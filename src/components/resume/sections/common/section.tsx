import { PropsWithChildren } from "react";
import { View } from "@react-pdf/renderer";
import { tw } from "../../styles";

export function Section({ children }: PropsWithChildren) {
    return (
        <View style={tw("flex flex-col mb-6")}>
            {children}
        </View>
    );
}
