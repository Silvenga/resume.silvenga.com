import { View } from "@react-pdf/renderer";
import type { PropsWithChildren } from "react";
import { tw } from "../../styles";

export function Section({ children }: PropsWithChildren) {
  return <View style={tw("flex flex-col mb-6")}>{children}</View>;
}
