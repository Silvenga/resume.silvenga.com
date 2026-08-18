import { View, type ViewProps } from "@react-pdf/renderer";
import type { PropsWithChildren } from "react";
import { tw } from "../../styles";

export function Section({ children, style, ...props }: PropsWithChildren<ViewProps>) {
  return (
    <View
      style={{
        ...tw("flex flex-col mb-6"),
        ...style,
      }}
      {...props}
    >
      {children}
    </View>
  );
}
